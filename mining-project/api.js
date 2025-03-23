import axios from 'axios';

// API URL নির্ধারণ
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // .env থেকে API URL পড়ুন

// axios instance তৈরি করা
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', // JSON Content-Type নির্ধারণ
  },
});

// JWT টোকেন হ্যান্ডলিং এবং রিকোয়েস্ট ইন্টারসেপ্টর
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // JWT টোকেন যুক্ত করা
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // ইরর হ্যান্ডলিং
  }
);

// রেসপন্স ইন্টারসেপ্টর (Optional: রেসপন্স ফরম্যাটিং বা গ্লোবাল ইরর হ্যান্ডলিং)
api.interceptors.response.use(
  (response) => {
    // রেসপন্স প্রসেসিং, যেমন প্রয়োজন হলে ডাটা বা স্ট্যাটাস কোড চেক করা
    return response;
  },
  (error) => {
    // গ্লোবাল ইরর হ্যান্ডলিং
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized এর ক্ষেত্রে টোকেন রিফ্রেশ বা লগআউট নির্দেশনা দেয়া যেতে পারে
      localStorage.removeItem('token');
      window.location.href = '/login'; // ইউজারকে লগইন পেজে রিডাইরেক্ট করা
    }
    return Promise.reject(error);
  }
);

export default api;
