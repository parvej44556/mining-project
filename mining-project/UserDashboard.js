import React from "react";
import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import CoinList from "../components/CoinList";
import TransactionHistory from "../components/TransactionHistory";
import DepositWithdraw from "../components/DepositWithdraw";

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">📊 User Dashboard</h1>

        {/* Balance & Deposit/Withdraw */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BalanceCard />
          <DepositWithdraw />
        </div>

        {/* Coin List */}
        <CoinList />

        {/* Transaction History */}
        <TransactionHistory />
      </div>
    </div>
  );
};

export default UserDashboard;
