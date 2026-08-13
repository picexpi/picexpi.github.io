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
 * برای Pi Payment API باید از Authorization: Key استفاده شود
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
 * خود پرداخت Pi با Pi.createPayment در فرانت‌اند ساخته می‌شود.
 * این route فقط رکورد داخلی سفارش/تراکنش را می‌سازد.
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
      where: {
        orderId: String(orderId),
      },
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
        status: 'PENDING',
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
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : undefined,
    });
  }
});

/**
 * @route   POST /api/payment/approve
 * @alias   POST /api/pi/approve
 * @desc    تأیید پرداخت Pi از سمت سرور
 * @access  Public for Pi SDK callback
 *
 * این route همان چیزی است که اگر صدا زده نشود،
 * Pi Wallet روی Preparing for a payment گیر می‌کند.
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

    console.log('🟡 Approving Pi payment:', {
      paymentId,
      orderId,
    });

    const piResponse = await axios.post(
      `${PI_API_BASE_URL}/payments/${paymentId}/approve`,
      {},
      {
        headers: getPiApiHeaders(),
        timeout: 10000,
      }
    );

    /**
     * اگر orderId از فرانت ارسال شده باشد،
     * تراکنش داخلی را به APPROVED تغییر می‌دهیم.
     */
    if (orderId) {
      try {
        await prisma.transaction.updateMany({
          where: {
            orderId: String(orderId),
          },
          data: {
            status: 'APPROVED',
            paymentId: String(paymentId),
          },
        });
      } catch (dbError) {
        console.warn(
          '⚠️ Could not update transaction status to APPROVED:',
          dbError.message
        );
      }
    }

    return res.json({
      success: true,
      message: 'Payment approved successfully',
      data: piResponse.data,
    });
  } catch (error) {
    console.error(
      '❌ Pi Approve Error:',
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: 'خطا در approve کردن پرداخت Pi',
      error:
        process.env.NODE_ENV === 'development'
          ? error.response?.data || error.message
          : undefined,
    });
  }
});

/**
 * @route   POST /api/payment/complete
 * @alias   POST /api/pi/complete
 * @desc    تکمیل پرداخت Pi بعد از تأیید کاربر در Wallet
 * @access  Public for Pi SDK callback
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

    console.log('🟢 Completing Pi payment:', {
      paymentId,
      txid,
      orderId,
    });

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
     * اگر orderId ارسال شده باشد،
     * تراکنش داخلی را completed می‌کنیم.
     */
    if (orderId) {
      try {
        await prisma.transaction.updateMany({
          where: {
            orderId: String(orderId),
          },
          data: {
            status: 'COMPLETED',
            paymentId: String(paymentId),
            txid: String(txid),
          },
        });
      } catch (dbError) {
        console.warn(
          '⚠️ Could not update transaction status to COMPLETED:',
          dbError.message
        );
      }
    }

    return res.json({
      success: true,
      message: 'Payment completed successfully',
      data: piResponse.data,
    });
  } catch (error) {
    console.error(
      '❌ Pi Complete Error:',
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: 'خطا در complete کردن پرداخت Pi',
      error:
        process.env.NODE_ENV === 'development'
          ? error.response?.data || error.message
          : undefined,
    });
  }
});

/**
 * @route   POST /api/payment/cancel
 * @desc    ثبت لغو پرداخت در دیتابیس
 * @access  Public / optional
 */
router.post('/cancel', async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId && !paymentId) {
      return res.status(400).json({
        success: false,
        message: 'orderId یا paymentId الزامی است',
      });
    }

    const whereCondition = orderId
      ? { orderId: String(orderId) }
      : { paymentId: String(paymentId) };

    await prisma.transaction.updateMany({
      where: whereCondition,
      data: {
        status: 'CANCELLED',
      },
    });

    return res.json({
      success: true,
      message: 'Payment cancelled status saved',
    });
  } catch (error) {
    console.error('❌ Payment Cancel Error:', error);

    return res.status(500).json({
      success: false,
      message: 'خطا در ثبت لغو پرداخت',
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
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
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
