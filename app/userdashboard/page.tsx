"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExchangeAlt, FaBalanceScale, FaBitcoin, FaChartLine, FaDollarSign, FaShoppingCart, FaArrowCircleDown, FaSignOutAlt, FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

declare global {
  interface Window {
    TradingView?: {
      widget: new (options: {
        container_id: string;
        autosize: boolean;
        symbol: string;
        interval: string;
        timezone: string;
        theme: string;
        style: string;
        locale: string;
        toolbar_bg: string;
        enable_publishing: boolean;
        allow_symbol_change: boolean;
        save_image: boolean;
        hide_top_toolbar: boolean;
        backgroundColor: string;
      }) => void;
    };
  }
}

const UserDashboard = () => {
  const [darkMode] = useState(false);
  const [showBuyBitcoin, setShowBuyBitcoin] = useState(false);
  const [showWithdrawBitcoin, setShowWithdrawBitcoin] = useState(false);
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("USD");
  const router = useRouter();

  const profit = 2549.0;
  const totalInvestment = 5003.0;
  const totalBalance = 7552.0;

  useEffect(() => {
    if (typeof window !== "undefined" && !window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            container_id: "investment_chart",
            autosize: true,
            symbol: "BITSTAMP:BTCUSD",
            interval: "W",
            timezone: "Etc/UTC",
            theme: darkMode ? "dark" : "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#000000",
            enable_publishing: false,
            allow_symbol_change: true,
            save_image: false,
            hide_top_toolbar: true,
            backgroundColor: "transparent",
          });
        }
      };
      script.onerror = () => {
        console.error("Failed to load TradingView script");
      };
      document.body.appendChild(script);
    }
  }, [darkMode]);

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
            <FaBitcoin /> BTC Balance: 0.09121 BTC
          </div>
          <div className="p-6 bg-white rounded shadow">
            <FaChartLine /> Profit: ${profit.toFixed(2)}
          </div>
        </div>
        <div className="mt-8">
          <div id="investment_chart" className="w-full h-96 border rounded"></div>
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
