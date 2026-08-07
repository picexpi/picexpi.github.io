// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authenticateToken } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @route   POST /api/payments/create
 * @desc    ایجاد یک درخواست پرداخت جدید در شبکه Pi و ذخیره در دیتابیس
 * @access  Private (Requires JWT)
 */
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { amount, orderId } = req.body;
        // فرض بر این است که middleware مقدار id را در req.user قرار داده است
        const userIdRaw = req.user.id; 

        if (!amount || !orderId) {
            return res.status(400).json({ success: false, message: 'مقدار مبلغ و شناسه سفارش الزامی است' });
        }

        // تبدیل ID به عدد (مطابق با اسکیما در PostgreSQL)
        const userId = Number(userIdRaw);

        if (isNaN(userId)) {
            return res.status(400).json({ success: false, message: 'فرمت شناسه کاربر نامعتبر است' });
        }
        
        // ۱. بررسی تکراری نبودن orderId در دیتابیس (قبل از درخواست به Pi)
        const existingTransaction = await prisma.transaction.findUnique({
            where: { orderId: String(orderId) }
        });

        if (existingTransaction) {
            return res.status(400).json({ success: false, message: `این سفارش قبلاً ثبت شده است: ${orderId}` });
        }

        // ۲. ارتباط با Pi Network API
        // نکته: حتماً PI_API_KEY را در فایل .env تنظیم کرده باشید
        let piResponseData = null;
        try {
            const piResponse = await axios.post('https://api.minepi.com/v2/payments/create', {
                amount: parseFloat(amount),
                memo: `Order ID: ${orderId}`,
                currency: 'PI'
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.PI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000 // جلوگیری از معطل شدن طولانی سرور
            });
            piResponseData = piResponse.data;
        } catch (piError) {
            console.error('❌ Pi API Error:', piError.response?.data || piError.message);
            return res.status(502).json({ 
                success: false, 
                message: 'خطا در ارتباط با شبکه Pi. لطفا دوباره تلاش کنید.' 
            });
        }

        // ۳. ذخیره تراکنش در PostgreSQL
        const newTransaction = await prisma.transaction.create({
            data: {
                userId: userId,
                amount: parseFloat(amount),
                orderId: String(orderId),
                status: 'pending'
            }
        });

        res.status(201).json({
            success: true,
            message: 'درخواست پرداخت با موفقیت ایجاد شد',
            data: {
                transaction: newTransaction,
                piData: piResponseData
            }
        });

    } catch (error) {
        console.error('❌ Payment Route Error:', error);
        
        // مدیریت خطای تکراری بودن (Prisma Unique Constraint)
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: 'این شناسه سفارش تکراری است.' });
        }

        res.status(500).json({
            success: false,
            message: 'خطای غیرمنتظره در پردازش پرداخت',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * @route   GET /api/payments/history
 * @desc    دریافت تاریخچه پرداخت‌های یک کاربر از PostgreSQL
 * @access  Private (Requires JWT)
 */
router.get('/history', authenticateToken, async (req, res) => {
    try {
        const userId = Number(req.user.id);

        if (isNaN(userId)) {
            return res.status(400).json({ success: false, message: 'شناسه کاربر نامعتبر است' });
        }

        const history = await prisma.transaction.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        piUserId: true
                    }
                }
            }
        });

        res.json({ success: true, data: history }); 
    } catch (error) {
        console.error('❌ History Route Error:', error);
        res.status(500).json({ success: false, message: 'خطا در دریافت تاریخچه تراکنش‌ها' });
    }
});

module.exports = router;
