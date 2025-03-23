import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/index.css';

// ✅ রিয়েক্ট ১৮ এর জন্য নতুন `createRoot` ব্যবহার করা হয়েছে
const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
