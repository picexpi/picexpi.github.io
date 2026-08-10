const { PrismaClient } = require('@prisma/client');
// اگر از پوشه generated استفاده می‌کنید، آدرس را تغییر دهید
// در اینجا فرض می‌کنیم Prisma به درستی نصب شده است
const prisma = new PrismaClient();

async function main() {
  console.log('⏳ در حال اتصال به دیتابیس Neon و همگام‌سازی...');
  try {
    // این متد مشابه npx prisma db push عمل می‌کند
    // از آنجایی که db push مستقیماً در کلاینت نیست، 
    // ما از یک ترفند استفاده می‌کنیم: ایجاد یک تراکنش ساده یا استفاده از مدل‌ها
    // اما بهترین راه در اینجا اجرای مستقیم دستور از طریق کد است:
    
    const { execSync } = require('child_process');
    console.log('🚀 اجرای دستور از طریق Child Process...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    console.log('✅ عملیات با موفقیت انجام شد!');
  } catch (e) {
    console.error('❌ خطا در همگام‌سازی:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
