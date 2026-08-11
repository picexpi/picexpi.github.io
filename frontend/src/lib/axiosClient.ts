// frontend/src/lib/axiosClient.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
  // استفاده از URL محیطی؛ اگر نبود از آدرس پیش‌فرض استفاده کن
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // اضافه کردن تایم‌اوت برای جلوگیری از معلق ماندن درخواست‌ها
  timeout: 10000, 
});

/**
 * Request Interceptor
 * اضافه کردن توکن به تمام درخواست‌ها
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * مدیریت هوشمند خطاها برای جلوگیری از صفحه سفید
 */
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    // ۱. مدیریت خطای عدم دسترسی یا انقضای توکن (401)
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn('Unauthorized! Cleaning up session...');
        
        // پاکسازی حافظه
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // IMPORTANT: با HashRouter باید از hash استفاده کنیم، نه path مستقیم
        // در GitHub Pages /jugl می‌شود 404، ولی /#/login همیشه کار می‌کند
        const currentHash = window.location.hash || '#/';
        if (!currentHash.includes('/login')) {
          window.location.hash = '#/login'; 
        }
      } 
      else if (status === 500) {
        console.error('Server Error: Something went wrong on the backend.');
      }
    } 
    // ۲. مدیریت خطای شبکه (وقتی سرور اصلاً پاسخ نمی‌دهد - بسیار مهم!)
    else if (error.request) {
      // این بخش زمانی اجرا می‌شود که درخواست فرستاده شده اما پاسخی دریافت نشده (مثلاً سرور خاموش است)
      console.error('Network Error: Cannot connect to the server. Please check your internet or server status.');
      // اینجا می‌توانید یک پیام کاربرپسند نشان دهید (مثلاً با استفاده از یک Toast)
    } 
    // ۳. مدیریت خطاهای دیگر
    else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
