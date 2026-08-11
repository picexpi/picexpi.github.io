/**
 * این یک شبیه‌ساز (Mock) برای Pi SDK است.
 * در محیط واقعی، شما باید اسکریپت Pi SDK را در index.html لود کنید
 * و این فایل با آن تعامل داشته باشد.
 */

export interface PiUser {
  uid: string;
  username: string;
}

export const getPiUser = async (): Promise<PiUser> => {
  console.log("Attempting to fetch Pi User...");
  
  // شبیه‌سازی تأخیر شبکه
  await new Promise(resolve => setTimeout(resolve, 1000));

  // در حالت توسعه، ما یک کاربر فرضی برمی‌گردانیم تا بیلد و تست انجام شود.
  // وقتی SDK واقعی را اضافه کردید، این بخش را با کد اصلی جایگزین کنید.
  return {
    uid: "pi_user_test_12345",
    username: "test_user_pi"
  };
};
