"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExchangeAlt, FaBalanceScale, FaBitcoin, FaChartLine, FaDollarSign, FaShoppingCart, FaArrowCircleDown, FaSignOutAlt, FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const [darkMode] = useState(false);
  const [showBuyBitcoin, setShowBuyBitcoin] = useState(false);
  const [showWithdrawBitcoin, setShowWithdrawBitcoin] = useState(false);
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("USD");
  const router = useRouter();

  const profit = 2802.0;
  const totalInvestment = 5782.0;
  const totalBalance = 8583.0;

  const handleLogout = () => {
    router.push("/");
    toast.success("Logged out successfully");
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText("bc1p3dkxtw8z8dqsu7rcxm0qrpnc6cx2rkpmw37tplpwktvjkf6k53ns46afze");
    toast.success("Wallet address copied to clipboard");
  };

  const handlePayout = () => {
    if (withdrawWallet && withdrawAmount) {
      setShowWithdrawBitcoin(false);
      toast.success(`Payout of ${withdrawAmount} ${withdrawCurrency} initiated.`);
    } else {
      toast.error("Please enter a valid Bitcoin wallet address and amount.");
    }
  };

  return (
    <div className={`min-h-screen p-8 font-sans ${darkMode ? "dark" : ""}`}>
      <ToastContainer />
      <header className="mb-4">
        <h1 className="text-4xl font-bold">Welcome Don Mullins</h1>
        <div className="flex gap-4 mt-4">
          <button className="bg-green-500 text-white p-3 rounded" onClick={() => setShowBuyBitcoin(true)}>
            <FaShoppingCart /> Buy Bitcoin
          </button>
          <button className="bg-red-500 text-white p-3 rounded" onClick={() => setShowWithdrawBitcoin(true)}>
            <FaArrowCircleDown /> Withdraw Bitcoin
          </button>
          <button className="bg-gray-500 text-white p-3 rounded" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded shadow">
            <FaBalanceScale /> Total Balance: ${totalBalance.toFixed(2)}
          </div>
          <div className="p-6 bg-white rounded shadow">
            <FaBitcoin /> BTC Balance: 0.09687 BTC
          </div>
          <div className="p-6 bg-white rounded shadow">
            <FaChartLine /> Profit: ${profit.toFixed(2)}
          </div>
        </div>
      </main>
      {showBuyBitcoin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl">Buy Bitcoin</h2>
            <button onClick={() => setShowBuyBitcoin(false)}>Close</button>
          </div>
        </div>
      )}
      {showWithdrawBitcoin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl">Withdraw Bitcoin</h2>
            <input type="text" placeholder="Wallet Address" value={withdrawWallet} onChange={(e) => setWithdrawWallet(e.target.value)} className="border p-2 w-full" />
            <input type="number" placeholder="Amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="border p-2 w-full mt-2" />
            <button onClick={handlePayout} className="bg-blue-500 text-white p-3 mt-4">Withdraw</button>
            <button onClick={() => setShowWithdrawBitcoin(false)} className="ml-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
