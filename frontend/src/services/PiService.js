// frontend/src/services/PiService.js
import axiosClient from '../lib/axiosClient';

const PiService = {
  /**
   * ایجاد رکورد داخلی پرداخت در بک‌اند
   * توجه:
   * پرداخت Pi با Pi.createPayment در فرانت‌اند ساخته می‌شود.
   * این endpoint اگر در بک‌اند فعال نباشد، اختیاری است.
   */
  createPayment: async (payload) => {
    try {
      const response = await axiosClient.post('/payment/create', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Approve پرداخت توسط سرور
   * مسیر اصلی در Bonto:
   * POST /api/pi/approve
   *
   * چون axiosClient معمولاً baseURL = .../api دارد،
   * اینجا باید /pi/approve بزنیم.
   */
  approvePayment: async ({ paymentId, orderId, amount, network, pageUrl, pageOrigin }) => {
    try {
      const response = await axiosClient.post('/pi/approve', {
        paymentId,
        orderId,
        amount,
        network,
        pageUrl,
        pageOrigin,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Complete پرداخت توسط سرور
   * مسیر اصلی در Bonto:
   * POST /api/pi/complete
   */
  completePayment: async ({
    paymentId,
    txid,
    orderId,
    amount,
    network,
    pageUrl,
    pageOrigin,
  }) => {
    try {
      const response = await axiosClient.post('/pi/complete', {
        paymentId,
        txid,
        orderId,
        amount,
        network,
        pageUrl,
        pageOrigin,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * دریافت تاریخچه پرداخت‌های کاربر
   * نیازمند JWT در axiosClient
   */
  getPaymentHistory: async () => {
    try {
      const response = await axiosClient.get('/payment/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * چک کردن وضعیت پرداخت
   * فعلاً در Bonto index.js route جدا برای status نداریم.
   * اگر بعداً اضافه شود، این فعال می‌شود.
   */
  getPaymentStatus: async (paymentId) => {
    try {
      const response = await axiosClient.get(`/payment/status/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Debug Origin برای بررسی CORS / Origin / Referer
   */
  debugOrigin: async (payload = {}) => {
    try {
      const response = await axiosClient.post('/debug-origin', {
        source: 'PiService',
        pageUrl: window.location.href,
        pageOrigin: window.location.origin,
        userAgent: navigator.userAgent,
        ...payload,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Poll: دریافت وضعیت رأی‌گیری
   */
  getCurrentPoll: async () => {
    try {
      const response = await axiosClient.get('/poll/current');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Poll: ثبت رأی
   */
  votePoll: async (option) => {
    try {
      const response = await axiosClient.post('/poll/vote', {
        option,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Poll: تاریخچه رأی کاربر
   */
  getPollHistory: async () => {
    try {
      const response = await axiosClient.get('/poll/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * دریافت لیست تراکنش‌ها برای ادمین
   * توجه:
   * در Bonto index.js فعلی /admin/transactions وجود ندارد.
   * فقط اگر backend کامل/ادمین داری استفاده شود.
   */
  getAdminTransactions: async () => {
    try {
      const response = await axiosClient.get('/admin/transactions');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default PiService;
