// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { authenticateToken } = require('../middleware/auth');

const prisma = new PrismaClient();

const PI_API_BASE_URL = 'https://api.minepi.com/v2';

/**
 * Helper: نرمال‌سازی role برای پاسخ به فرانت‌اند
 */
function normalizeRole(role) {
  if (!role) return 'user';

  const lowerRole = String(role).toLowerCase();

  if (lowerRole === 'admin') return 'admin';

  return 'user';
}

/**
 * Helper: ساخت JWT
 */
function createJwtToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    {
      id: user.id,
      role: user.role || 'USER',
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRATION || '7d',
    }
  );
}

/**
 * Helper: بررسی accessToken با Pi API
 * اگر PI_REQUIRE_ACCESS_TOKEN=true باشد، نبودن یا نامعتبر بودن accessToken باعث خطا می‌شود.
 */
async function verifyPiAccessTokenIfProvided(accessToken) {
  const requireAccessToken = process.env.PI_REQUIRE_ACCESS_TOKEN === 'true';

  if (!accessToken) {
    if (requireAccessToken) {
      throw new Error('Pi accessToken is required');
    }

    console.warn('⚠️ Pi accessToken was not provided. Skipping Pi verification.');
    return null;
  }

  try {
    const response = await axios.get(`${PI_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    console.error('❌ Pi accessToken verification failed:', error.response?.data || error.message);

    if (requireAccessToken) {
      throw new Error('Invalid Pi accessToken');
    }

    return null;
  }
}

/**
 * @route   POST /api/auth/pi-login
 * @desc    احراز هویت با Pi Network
 */
router.post('/pi-login', async (req, res) => {
  try {
    const { pi_user_id, username, accessToken } = req.body;

    if (!pi_user_id) {
      return res.status(400).json({
        success: false,
        message: 'Pi User ID الزامی است',
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('CRITICAL ERROR: JWT_SECRET is not defined in .env');

      return res.status(500).json({
        success: false,
        message: 'تنظیمات سرور ناقص است: JWT_SECRET تعریف نشده است',
      });
    }

    /**
     * بررسی اختیاری accessToken با Pi API
     * برای امنیت بهتر، در production مقدار زیر را در env بگذار:
     * PI_REQUIRE_ACCESS_TOKEN=true
     */
    const piMe = await verifyPiAccessTokenIfProvided(accessToken);

    /**
     * اگر Pi API جواب معتبر داد، بهتر است username و uid را از آن بگیریم.
     * ساختار پاسخ ممکن است بسته به SDK/API کمی متفاوت باشد؛ برای همین fallback گذاشتیم.
     */
    const verifiedPiUserId =
      piMe?.uid ||
      piMe?.user?.uid ||
      piMe?.id ||
      pi_user_id;

    const verifiedUsername =
      piMe?.username ||
      piMe?.user?.username ||
      username ||
      `PiUser_${String(verifiedPiUserId).substring(0, 5)}`;

    let user = await prisma.user.findUnique({
      where: {
        piUserId: String(verifiedPiUserId),
      },
    });

    if (!user) {
      console.log(`[Auth] New Pi user detected: ${verifiedPiUserId}. Creating account...`);

      user = await prisma.user.create({
        data: {
          piUserId: String(verifiedPiUserId),
          username: verifiedUsername,
        },
      });
    } else {
      console.log(`[Auth] Existing user login: ${user.username} (${user.piUserId})`);

      /**
       * اگر username تغییر کرده باشد، آپدیت می‌کنیم.
       */
      if (verifiedUsername && user.username !== verifiedUsername) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { username: verifiedUsername },
        });
      }
    }

    const token = createJwtToken(user);

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: normalizeRole(user.role),
        piUserId: user.piUserId,
      },
    });
  } catch (error) {
    console.error('❌ Pi Login Error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'خطا در فرآیند احراز هویت شبکه Pi',
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    دریافت اطلاعات کاربر فعلی
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    let userId = req.user.id;

    /**
     * اگر id در Prisma عددی باشد، باید Number شود.
     * اگر در schema تو String است، این تبدیل مشکلی ایجاد نمی‌کند مگر اینکه عددی نباشد.
     */
    const numericUserId = Number(userId);

    const whereCondition = Number.isNaN(numericUserId)
      ? { id: userId }
      : { id: numericUserId };

    const user = await prisma.user.findUnique({
      where: whereCondition,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: normalizeRole(user.role),
        piUserId: user.piUserId,
      },
    });
  } catch (error) {
    console.error('❌ Get Me Error:', error);

    return res.status(500).json({
      success: false,
      message: 'خطا در دریافت اطلاعات کاربری',
    });
  }
});

module.exports = router;
