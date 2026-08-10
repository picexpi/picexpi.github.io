const { execSync } = require('child_process');

async function main() {
  console.log('🚀 Attempting to sync database with Neon.tech...');
  try {
    // ما از مسیر مستقیم استفاده می‌کنیم تا مطمئن شویم prisma پیدا می‌شود
    console.log('⏳ Running: npx prisma db push');
    
    // اجرای دستور
    execSync('npx prisma db push', { 
      stdio: 'inherit',
      env: { ...process.env } 
    });
    
    console.log('✅ SUCCESS: Database is now in sync with Neon!');
  } catch (error) {
    console.error('❌ ERROR during sync:');
    console.error(error.message);
    console.log('\n💡 TIP: Make sure your DATABASE_URL in .env is correct and points to Neon.tech');
  }
}

main();
