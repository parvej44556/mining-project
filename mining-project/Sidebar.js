import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">🚀 Crypto Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-300">🏠 Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/transactions" className="hover:text-gray-300">💳 Transactions</Link>
        </li>
        <li className="mb-4">
          <Link to="/logout" className="hover:text-gray-300">🚪 Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
