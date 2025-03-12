"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Logged in successfully");
    router.push("/userdashboard");
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Signed up successfully");
    router.push("/userdashboard");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ToastContainer />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <img
          src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
          alt="Bitcoin Logo"
          width="100"
          height="100"
        />
        <h1 className="text-4xl font-bold">Welcome to Bitvest.org</h1>
        <p className="text-lg text-center sm:text-left">
          Discover the future of finance with Bitcoin. Secure, decentralized, and global.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex items-center justify-center">
        <p>&copy; 2025 Bitvest. All rights reserved.</p>
      </footer>
    </div>
  );
}
