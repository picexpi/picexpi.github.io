// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

/**
 * Middleware برای احراز هویت کاربران عادی با JWT
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: No Token Provided. Please login first.',
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error('CRITICAL ERROR: JWT_SECRET is not defined.');

    return res.status(500).json({
      success: false,
      message: 'Server authentication configuration is incomplete.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or Expired Token',
      });
    }

    req.user = decodedPayload;
    next();
  });
};

/**
 * Middleware برای محافظت از مسیرهای ادمین
 */
const authenticateAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];

  if (!process.env.ADMIN_SECRET_KEY) {
    console.error('CRITICAL ERROR: ADMIN_SECRET_KEY is not defined.');

    return res.status(500).json({
      success: false,
      message: 'Admin authentication configuration is incomplete.',
    });
  }

  if (adminKey && adminKey === process.env.ADMIN_SECRET_KEY) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Forbidden: Unauthorized Admin Access',
  });
};

module.exports = { authenticateToken, authenticateAdmin };
