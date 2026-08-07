// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');

// ایجاد یک نمونه از Prisma (بهتر است این خط در یک فایل جدا مثل db.js باشد و اینجا import شود)
const prisma = new PrismaClient();

/**
 * @route   POST /api/auth/pi-login
 * @desc    احراز هویت با استفاده از شناسه کاربر شبکه Pi
 */
router.post('/pi-login', async (req, res) => {
  const { pi_user_id, username } = req.body;

  // ۱. اعتبارسنجی ورودی
  if (!pi_user_id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Pi User ID الزامی است' 
    });
  }

  // بررسی وجود JWT_SECRET در محیط
  if (!process.env.JWT_SECRET) {
    console.error("CRITICAL ERROR: JWT_SECRET is not defined in .env");
    return res.status(500).json({ 
      success: false, 
      message: 'تنظیمات سرور ناقص است (Missing JWT Secret)' 
    });
  }

  try {
    // ۲. جستجو در PostgreSQL با استفاده از Prisma
    // استفاده از piUserId که در schema.prisma به صورت unique تعریف شده است
    let user = await prisma.user.findUnique({
      where: { piUserId: pi_user_id }
    });

    if (!user) {
      // ۳. اگر کاربر جدید است، ایجاد کاربر در دیتابیس
      console.log(`[Auth] New user detected: ${pi_user_id}. Creating account...`);
      user = await prisma.user.create({
        data: {
          piUserId: pi_user_id,
          username: username || `PiUser_${pi_user_id.substring(0, 5)}`,
          // اگر در schema فیلد role دارید، اینجا مقداردهی می‌شود
          // role: 'USER' 
        }
      });
    } else {
      console.log(`[Auth] Existing user login: ${user.username} (${user.piUserId})`);
    }

    // ۴. ایجاد توکن JWT
    // توجه: در PostgreSQL فیلد شناسه معمولاً 'id' است (Int یا String)
    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role || 'USER' 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION || '7d' }
    );

    // ۵. ارسال پاسخ موفقیت‌آمیز
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role || 'USER',
        piUserId: user.piUserId
      }
    });

  } catch (error) {
    console.error('❌ Pi Login Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'خطا در فرآیند احراز هویت شبکه Pi' 
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    دریافت اطلاعات کاربر فعلی از طریق توکن
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // req.user.id توسط middleware authenticateToken مقداردهی شده است
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'کاربر یافت نشد' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        piUserId: user.piUserId
      }
    });
  } catch (error) {
    console.error('❌ Get Me Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'خطا در دریافت اطلاعات کاربری' 
    });
  }
});

module.exports = router;
