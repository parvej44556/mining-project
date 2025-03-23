import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">স্বাগতম!</h1>
      <p className="text-lg mb-4">আপনার অ্যাকাউন্টে লগইন করুন অথবা সাইনআপ করুন।</p>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md">লগইন</Link>
        <Link to="/signup" className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md">সাইনআপ</Link>
      </div>
    </div>
  );
};

export default Home;
