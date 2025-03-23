import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // লগইন ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      login(response.data.token); // JWT টোকেন Context এ সেভ করা
      navigate('/dashboard'); // লগইন সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট
    } catch (err) {
      setError(err.response?.data?.message || 'ইমেইল অথবা পাসওয়ার্ড ভুল');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">লগইন</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ইমেইল</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'লোডিং...' : 'লগইন'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
