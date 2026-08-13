// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
  'https://tiraxturumuz1.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    /**
     * اجازه به درخواست‌های بدون origin مثل Postman یا health checks
     */
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`⚠️ CORS blocked origin: ${origin}`);

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '1mb' }));

// --- Routes ---
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);

/**
 * مسیر اصلی پرداخت‌های پروژه
 */
app.use('/api/payment', paymentRoutes);

/**
 * Alias برای سازگاری با کدهای فرانت‌اندی که /api/pi/approve صدا می‌زنند
 */
app.use('/api/pi', paymentRoutes);

/**
 * اگر قبلاً جایی در فرانت‌اند /api/payments استفاده شده باشد، این alias هم کمک می‌کند.
 */
app.use('/api/payments', paymentRoutes);

app.use('/api/admin', adminRoutes);

// --- Root Check ---
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Pi DAO backend is running',
  });
});

// --- Health Check ---
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: 'OK',
      message: 'Server is running and connected to PostgreSQL via Prisma',
    });
  } catch (error) {
    console.error('❌ Database Connection Error:', error);

    return res.status(500).json({
      status: 'ERROR',
      message: 'Database connection failed.',
    });
  }
});

// --- 404 Handler ---
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error('⚠️ Unhandled Error:', err.stack || err);

  return res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong on the server!',
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  const publicApiUrl =
    process.env.PUBLIC_API_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    `http://localhost:${PORT}`;

  console.log('==========================================');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 Public API URL: ${publicApiUrl}/api`);
  console.log('✅ Database: PostgreSQL (Prisma ORM)');
  console.log('✅ Routes:');
  console.log('   - /api/auth');
  console.log('   - /api/payment');
  console.log('   - /api/pi');
  console.log('   - /api/payments');
  console.log('   - /api/admin');
  console.log('==========================================');
});

const shutdown = async () => {
  console.log('\nStopping server...');

  try {
    await prisma.$disconnect();

    server.close(() => {
      console.log('Server closed and Prisma disconnected.');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Shutdown Error:', error);
    process.exit(1);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
