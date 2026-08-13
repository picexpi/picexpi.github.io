// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authenticateToken } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PI_API_BASE_URL = 'https://api.minepi.com/v2';

/**
 * Helper: دریافت API Key پای
 */
function getPiApiKey() {
  const apiKey = process.env.PI_API_KEY;

  if (!apiKey) {
    throw new Error('PI_API_KEY is not defined in environment variables');
  }

  return apiKey;
}

/**
 * Helper: هدرهای درخواست به Pi API
 * نکته مهم:
 * برای Payment API باید از Authorization: Key استفاده شود، نه Bearer
 */
function getPiApiHeaders() {
  return {
    Authorization: `Key ${getPiApiKey()}`,
    'Content-Type': 'application/json',
  };
}

/**
 * @route   POST /api/payment/create
 * @desc    ایجاد رکورد داخلی پرداخت در دیتابیس
 * @access  Private
 *
 * نکته:
 * پرداخت Pi با SDK در فرانت‌اند ساخته می‌شود.
 * بنابراین این route فقط برای ساخت order/transaction داخلی است.
 */
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const userIdRaw = req.user.id;

    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'مقدار مبلغ و شناسه سفارش الزامی است',
      });
    }

    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'مبلغ پرداخت نامعتبر است',
      });
    }

    const userId = Number(userIdRaw);

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'فرمت شناسه کاربر نامعتبر است',
      });
    }

    const existingTransaction = await prisma.transaction.findUnique({
      where: { orderId: String(orderId) },
    });

    if (existingTransaction) {
      return res.status(400).json({
        success: false,
        message: `این سفارش قبلاً ثبت شده است: ${orderId}`,
      });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        amount: parsedAmount,
        orderId: String(orderId),
        status: 'pending',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'رکورد پرداخت با موفقیت ایجاد شد',
      data: {
        transaction: newTransaction,
      },
    });
  } catch (error) {
    console.error('❌ Payment Create Route Error:', error);

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'این شناسه سفارش تکراری است.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'خطای غیرمنتظره در ایجاد پرداخت',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * @route   POST /api/payment/approve
 * @alias   POST /api/pi/approve
 * @desc    تأیید پرداخت Pi از سمت سرور
 * @access  Public for SDK callback / بهتر است بعداً امن‌تر شود
 *
 * این route همان چیزی است که کیف پول منتظر آن می‌ماند.
 * اگر این route صدا زده نشود، Wallet روی Preparing for a payment گیر می‌کند.
 */
router.post('/approve', async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'paymentId الزامی است',
      });
    }

    console.log('🟡 Approving Pi payment:', paymentId);

    const piResponse = await axios.post(
      `${PI_API_BASE_URL}/payments/${paymentId}/approve`,
      {},
      {
        headers: getPiApiHeaders(),
        timeout: 10000,
      }
    );

    /**
     * اگر orderId از فرانت ارسال شود، وضعیت تراکنش داخلی را هم آپدیت می‌کنیم.
     * چون schema فعلی تو را کامل نداریم، فقط فیلدهای موجود قبلی را استفاده می‌کنیم:
     * orderId و status
     */
    if (orderId) {
      try {
        await prisma.transaction.updateMany({
          where: { orderId: String(orderId) },
          data: { status: 'approved' },
        });
      } catch (dbError) {
        console.warn('⚠️ Could not update transaction status to approved:', dbError.message);
      }
    }

    return res.json({
      success: true,
      message: 'Payment approved successfully',
      data: piResponse.data,
    });
  } catch (error) {
    console.error('❌ Pi Approve Error:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'خطا در approve کردن پرداخت Pi',
      error: process.env.NODE_ENV === 'development'
        ? error.response?.data || error.message
        : undefined,
    });
  }
});

/**
 * @route   POST /api/payment/complete
 * @alias   POST /api/pi/complete
 * @desc    تکمیل پرداخت Pi بعد از تایید کاربر در Wallet
 * @access  Public for SDK callback / بهتر است بعداً امن‌تر شود
 */
router.post('/complete', async (req, res) => {
  try {
    const { paymentId, txid, orderId } = req.body;

    if (!paymentId || !txid) {
      return res.status(400).json({
        success: false,
        message: 'paymentId و txid الزامی هستند',
      });
    }

    console.log('🟢 Completing Pi payment:', { paymentId, txid });

    const piResponse = await axios.post(
      `${PI_API_BASE_URL}/payments/${paymentId}/complete`,
      {
        txid,
      },
      {
        headers: getPiApiHeaders(),
        timeout: 10000,
      }
    );

    /**
     * اگر orderId ارسال شده باشد، وضعیت تراکنش داخلی را completed می‌کنیم.
     * اگر schema تو فیلد txid ندارد، فقط status را تغییر می‌دهیم تا خطای Prisma نگیری.
     */
    if (orderId) {
      try {
        await prisma.transaction.updateMany({
          where: { orderId: String(orderId) },
          data: { status: 'completed' },
        });
      } catch (dbError) {
        console.warn('⚠️ Could not update transaction status to completed:', dbError.message);
      }
    }

    return res.json({
      success: true,
      message: 'Payment completed successfully',
      data: piResponse.data,
    });
  } catch (error) {
    console.error('❌ Pi Complete Error:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'خطا در complete کردن پرداخت Pi',
      error: process.env.NODE_ENV === 'development'
        ? error.response?.data || error.message
        : undefined,
    });
  }
});

/**
 * @route   GET /api/payment/history
 * @desc    دریافت تاریخچه پرداخت‌های یک کاربر
 * @access  Private
 */
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = Number(req.user.id);

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'شناسه کاربر نامعتبر است',
      });
    }

    const history = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            piUserId: true,
          },
        },
      },
    });

    return res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error('❌ History Route Error:', error);

    return res.status(500).json({
      success: false,
      message: 'خطا در دریافت تاریخچه تراکنش‌ها',
    });
  }
});

module.exports = router;
