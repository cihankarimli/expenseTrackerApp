// ...existing code...
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, fetchWithAuth } from "../utils/auth";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/"); // login page
      return;
    }

    (async () => {
      try {
        const data = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
        );
        // backend cavabında data.user var (authController.getCurrentUser)
        setUsername(data?.user?.username || data?.username || null);
      } catch (err) {
        console.error("Profile fetch failed:", err);
        localStorage.removeItem("token");
        router.push("/");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen  from-gray-900 to-gray-800 ">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/80 backdrop-blur sticky top-0 z-40 shadow-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 container mx-auto max-w-6xl rounded-b-lg"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center">
            <h1
              className="font-extrabold text-gray-100"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.4rem)" }}
            >
              Expense Tracker
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-200">
            {username ? `Xoş gəldin, ${username}` : "Xoş gəldin"}
          </p>

          <div className="flex gap-3 items-center">
            <Link
              href="/dashboard/amounts"
              className="text-blue-300 hover:underline px-3 py-1 rounded-md hover:bg-blue-900/40"
            >
              Amounts
            </Link>
            <Link
              href="/dashboard/profits"
              className="text-green-300 hover:underline px-3 py-1 rounded-md hover:bg-green-900/40"
            >
              Profits
            </Link>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700 transition-shadow shadow-sm"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/");
              }}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="p-6 container mx-auto max-w-6xl"
      >
        {children}
      </motion.main>
    </div>
  );
}
