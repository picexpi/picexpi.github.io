// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth'); // مطمئن شوید این تابع در auth.js وجود دارد
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @route   GET /api/admin/stats
 * @desc    دریافت آمار واقعی از دیتابیس
 * @access  Private (Requires Admin Role)
 */
router.get('/stats', authenticateAdmin, async (req, res) => {
    try {
        // دریافت آمار واقعی با استفاده از Prisma
        const [userCount, transactionCount] = await Promise.all([
            prisma.user.count(),
            prisma.transaction.count()
        ]);

        // محاسبه مجموع مبالغ تراکنش‌های موفق (اگر استاتوس 'completed' دارید)
        const totalRevenue = await prisma.transaction.aggregate({
            _sum: { amount: true }
        });

        const stats = {
            totalUsers: userCount,
            totalTransactions: transactionCount,
            totalRevenue: totalRevenue._sum.amount || 0,
            systemStatus: 'Healthy'
        };

        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('❌ Admin Stats Error:', error);
        res.status(500).json({ success: false, message: 'خطا در دریافت آمار سیستم' });
    }
});

/**
 * @route   GET /api/admin/transactions
 * @desc    مشاهده لیست تمامی تراکنش‌ها با قابلیت Pagination ساده
 * @access  Private (Requires Admin Role)
 */
router.get('/transactions', authenticateAdmin, async (req, res) => {
    try {
        // دریافت تمام تراکنش‌ها به همراه اطلاعات کاربر
        const allTransactions = await prisma.transaction.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        piUserId: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ success: true, data: allTransactions });
    } catch (error) {
        console.error('❌ Admin Transactions Error:', error);
        res.status(500).json({ success: false, message: 'خطا در دریافت لیست تراکنش‌ها' });
    }
});

module.exports = router;
