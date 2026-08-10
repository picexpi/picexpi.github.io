// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// --- اصلاح بخش CORS ---
// به جای اجازه دادن به همه، بهتر است مشخص کنیم چه کسی اجازه دارد به ما درخواست بزند
const corsOptions = {
  origin: [
    'https://tiraxturumuz1.github.io', // آدرس فرانت‌اِند شما
    'http://localhost:5173',         // آدرس فرانت‌اِند در حالت توسعه (Vite)
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // اجازه ارسال کوکی‌ها و توکن‌های JWT
};
app.use(cors(corsOptions));

app.use(express.json());

// --- Routes ---
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// --- Health Check ---
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ 
      status: 'OK', 
      message: 'Server is running and connected to PostgreSQL via Prisma' 
    });
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed.' 
    });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("⚠️ Unhandled Error:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong on the server!' 
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  // --- اصلاح بخش Log برای محیط Production ---
  const host = req.get('host') || 'localhost';
  const protocol = req.protocol || 'http';
  const baseUrl = `${protocol}://${host}`;

  console.log(`==========================================`);
  console.log(`🚀 Server is running on por ${PORT}`);
  console.log(`🔗 Public API URL: ${baseUr}/api`); // نمایش آدرس واقعی سرور
  console.log(`✅ Database: PostgreSQL (Prisma ORM)`);
  console.log(`==========================================`);
});

const shutdown = async () => {
  console.log('\nStopping server...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed and Prisma disconnected.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
