/**
 * Mock Pi SDK Wrapper
 * این فایل برای رفع خطای بیلد ساخته شده و ساختار لازم برای getPiUser را فراهم می‌کند.
 * از آنجایی که در محیط توسعه/بیلد، SDK اصلی Pi در دسترس نیست، ما یک شبیه‌ساز (Mock) ایجاد می‌کنیم.
 */

export interface PiUser {
  uid: string;
  username: string;
}

/**
 * شبیه‌سازی دریافت اطلاعات کاربر از SDK اصلی Pi
 */
export const getPiUser = async (): Promise<PiUser> => {
  console.log("🛠️ [Mock SDK] Attempting to fetch Pi User...");
  
  // شبیه‌سازی تأخیر شبکه (۱ ثانیه) برای تست صحیح وضعیت Loading در UI
  await new Promise(resolve => setTimeout(resolve, 1000));

  // اطلاعات تست برای اطمینان از کارکرد صحیح سیستم احراز هویت
  return {
    uid: "pi_user_mock_7890",
    username: "mock_user_test"
  };
};

// اگر در فایل‌های دیگر به شیء اصلی SDK نیاز داشتید، این خط مانع از خطای "undefined" می‌شود
export const PiSDK = {
  isReady: true,
  getPiUser: getPiUser
};
