import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');  // যদি ইউজার লগইন না থাকে, হোম পেজে রিডাইরেক্ট করুন
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/admin-dashboard');
        setMessage(response.data.message);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setMessage('আপনার কাছে এই পেজের অ্যাক্সেস নেই');
        } else {
          setMessage('একটি ত্রুটি ঘটেছে, দয়া করে পরে চেষ্টা করুন');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  return (
    <div className="admin-dashboard">
      <h2>এডমিন ড্যাশবোর্ড</h2>
      {loading ? (
        <p>লোড হচ্ছে...</p>  // লোডিং স্টেট দেখানো হচ্ছে
      ) : (
        <p>{message}</p>
      )}
      {user && <button onClick={logout} className="btn btn-danger">লগআউট</button>}
    </div>
  );
};

export default AdminDashboard;
