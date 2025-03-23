import React, { useState, useEffect } from "react";

const BalanceCard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // API থেকে ইউজারের ব্যালেন্স লোড করুন
    fetch("http://localhost:5000/api/user/balance")
      .then((res) => res.json())
      .then((data) => setBalance(data.balance));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold">💰 Account Balance</h2>
      <p className="text-3xl font-semibold text-green-500 mt-2">${balance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceCard;
