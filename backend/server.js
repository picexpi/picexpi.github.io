// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// بارگذاری متغیرهای محیطی
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middlewareها
app.use(express.json());
app.use(cors()); // برای اجازه دادن به فرانت‌اند (Vite) جهت ارسال درخواست به بک‌اند

// --- وارد کردن مسیرهای API (Routes) ---
// بسیار مهم: در داخل این فایل‌ها، نباید از مدل‌های قدیمی استفاده کنید.
// باید در آن فایل‌ها هم از prisma استفاده کنید.
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// --- مسیر تست سلامت (Health Check) ---
app.get('/health', async (req, res) => {
  try {
    // تست واقعی اتصال به دیتابیس از طریق Prisma
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ 
      status: 'OK', 
      message: 'Server is running and connected to PostgreSQL via Prisma' 
    });
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed. Check your DATABASE_URL in .env' 
    });
  }
});

// مدیریت خطاهای عمومی (Global Error Handler)
app.use((err, req, res, next) => {
  console.error("⚠️ Unhandled Error:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong on the server!' 
  });
});

// شروع به کار سرور
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`✅ Database: PostgreSQL (Prisma ORM)`);
  console.log(`==========================================`);
});

// مدیریت خاموش شدن امن (Graceful Shutdown)
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
