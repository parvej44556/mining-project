import React, { useState, useEffect } from "react";

const CoinList = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/coins")
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">📊 Coin Prices</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Symbol</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin._id} className="border-b">
              <td className="p-2">{coin.name}</td>
              <td className="p-2">{coin.symbol}</td>
              <td className="p-2 text-green-500">${coin.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
