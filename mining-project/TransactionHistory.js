import React, { useState, useEffect } from "react";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">💳 Transaction History</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="border-b">
              <td className="p-2">{tx.type}</td>
              <td className="p-2">${tx.amount.toFixed(2)}</td>
              <td className={`p-2 ${tx.status === "completed" ? "text-green-500" : "text-red-500"}`}>
                {tx.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
