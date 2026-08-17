// backend/server.js
const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');

// اگر Bonto یا Docker از ریشه پروژه اجرا کند، این باعث می‌شود backend/.env هم خوانده شود
dotenv.config({ path: path.resolve(__dirname, '.env') });

// اگر متغیرها از پنل Bonto / Docker env آمده باشند، همین‌ها استفاده می‌شوند
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// اگر پشت reverse-proxy یا Bonto proxy هستی
app.set('trust proxy', 1);

// -------------------------
// Security & Parsers
// -------------------------

// Security headers
app.use(helmet());

// Body parser
app.use(express.json({ limit: '1mb' }));

// Request logger سبک برای دیباگ در Bonto / Docker
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// -------------------------
// CORS
// -------------------------

const defaultAllowedOrigins = [
  'https://tiraxturumuz1.github.io',
  'https://apppidaonkm2562.pinet.com',
  'https://pidao.bonto.run',
  'http://localhost:5173',
  'http://localhost:3000',
];

const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [];

const allowedOrigins = Array.from(
  new Set([
    ...defaultAllowedOrigins,
    ...envAllowedOrigins,
    process.env.FRONTEND_URL,
  ].filter(Boolean))
);

console.log('✅ Allowed CORS origins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // اجازه به درخواست‌های بدون origin مثل Postman، health check، curl
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`⚠️ CORS blocked origin: ${origin}`);

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// -------------------------
// Routes
// -------------------------

const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

app.use('/api/auth', authRoutes);

// مسیر اصلی پرداخت‌های پروژه
app.use('/api/payment', paymentRoutes);

// Alias برای فرانت‌اندی که /api/pi/approve و /api/pi/complete صدا می‌زند
app.use('/api/pi', paymentRoutes);

// Alias برای حالت /api/payments
app.use('/api/payments', paymentRoutes);

// Admin routes اگر وجود داشته باشد
try {
  const adminRoutes = require('./routes/admin');
  app.use('/api/admin', adminRoutes);
  console.log('✅ Admin routes loaded');
} catch (error) {
  console.warn('⚠️ Admin routes not loaded:', error.message);
}

// -------------------------
// Root Check
// -------------------------

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Pi DAO backend is running',
    api: process.env.PUBLIC_API_URL || null,
    time: new Date().toISOString(),
  });
});

// -------------------------
// Health Checks
// -------------------------

// Health سبک، بدون وابستگی به دیتابیس
const healthHandler = (req, res) => {
  return res.status(200).json({
    status: 'OK',
    success: true,
    message: 'Server is running',
    service: 'Pi DAO Backend',
    time: new Date().toISOString(),
  });
};

// Health اصلی
app.get('/health', healthHandler);

// Alias برای health داخل /api
app.get('/api/health', healthHandler);

// تست جداگانه دیتابیس
const dbHealthHandler = async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: 'OK',
      success: true,
      message: 'Server is connected to PostgreSQL via Prisma',
      database: 'PostgreSQL',
      orm: 'Prisma',
      time: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Database Connection Error:', error);

    return res.status(500).json({
      status: 'ERROR',
      success: false,
      message: 'Database connection failed.',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
      time: new Date().toISOString(),
    });
  }
};

// هر دو مسیر را فعال نگه می‌داریم تا هم مستقیم و هم پشت /api کار کند
app.get('/db-health', dbHealthHandler);
app.get('/api/db-health', dbHealthHandler);

// -------------------------
// Debug Env Check
// -------------------------

const envCheckHandler = (req, res) => {
  return res.status(200).json({
    success: true,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    HAS_DATABASE_URL: Boolean(process.env.DATABASE_URL),
    HAS_JWT_SECRET: Boolean(process.env.JWT_SECRET),
    HAS_PI_API_KEY: Boolean(process.env.PI_API_KEY),
    HAS_ADMIN_SECRET_KEY: Boolean(process.env.ADMIN_SECRET_KEY),
    PI_REQUIRE_ACCESS_TOKEN: process.env.PI_REQUIRE_ACCESS_TOKEN || null,
    time: new Date().toISOString(),
  });
};

app.get('/env-check', envCheckHandler);
app.get('/api/env-check', envCheckHandler);

// -------------------------
// 404 Handler
// -------------------------

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    time: new Date().toISOString(),
  });
});

// -------------------------
// Global Error Handler
// -------------------------

app.use((err, req, res, next) => {
  console.error('⚠️ Unhandled Error:', err.stack || err);

  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: err.message,
      time: new Date().toISOString(),
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong on the server!',
    time: new Date().toISOString(),
  });
});

// -------------------------
// Start Server
// -------------------------

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  const publicApiUrl =
    process.env.PUBLIC_API_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    `http://localhost:${PORT}`;

  console.log('==========================================');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 Public API URL: ${publicApiUrl}/api`);
  console.log('✅ Routes:');
  console.log('   - GET  /');
  console.log('   - GET  /health');
  console.log('   - GET  /api/health');
  console.log('   - GET  /db-health');
  console.log('   - GET  /api/db-health');
  console.log('   - GET  /env-check');
  console.log('   - GET  /api/env-check');
  console.log('   - POST /api/auth/pi-login');
  console.log('   - GET  /api/auth/me');
  console.log('   - POST /api/pi/approve');
  console.log('   - POST /api/pi/complete');
  console.log('   - POST /api/payment/approve');
  console.log('   - POST /api/payment/complete');
  console.log('==========================================');
});

// -------------------------
// Graceful Shutdown
// -------------------------

const shutdown = async (signal) => {
  console.log(`\n${signal} received. Stopping server...`);

  try {
    await prisma.$disconnect();

    server.close(() => {
      console.log('Server closed and Prisma disconnected.');
      process.exit(0);
    });

    // اگر server.close گیر کرد، بعد از 10 ثانیه خارج شود
    setTimeout(() => {
      console.error('Force shutdown after timeout.');
      process.exit(1);
    }, 10000).unref();
  } catch (error) {
    console.error('❌ Shutdown Error:', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
