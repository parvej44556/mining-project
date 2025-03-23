import React, { useState } from "react";
import api from "../utils/api"; // API কল করার জন্য
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", userData);
      navigate("/login"); // সাইনআপ সফল হলে লগইন পেজে নিয়ে যাবে
    } catch (err) {
      setError(err.response?.data?.message || "সাইনআপ ব্যর্থ হয়েছে!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">সাইনআপ করুন</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">নাম</label>
            <input type="text" name="name" className="w-full p-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ইমেইল</label>
            <input type="email" name="email" className="w-full p-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">পাসওয়ার্ড</label>
            <input type="password" name="password" className="w-full p-2 border rounded" onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">সাইনআপ</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
