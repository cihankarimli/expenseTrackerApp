"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "./utils/auth";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isRegister ? "register" : "login";
      const body = isRegister
        ? { username, email, password }
        : { email, password };

      console.log("📤 API URL:", process.env.NEXT_PUBLIC_API_URL);
      console.log("📤 Endpoint:", endpoint);
      console.log("📤 Request body:", body);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      console.log("📥 Response status:", res.status);
      console.log("📥 Response headers:", res.headers);

      // Response text-ini əvvəlcə oxuyun
      const text = await res.text();
      console.log("📥 Response text:", text);

      // JSON parse edin
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("❌ JSON parse xətası:", parseError);
        throw new Error("Server yanlış format qaytardı: " + text);
      }

      console.log("📥 Parsed data:", data);

      if (!data.success) {
        throw new Error(data.message || "Authentication failed");
      }

      setToken(data.token);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("❌ Login/Register xətası:", err);
      setError(err.message || "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Register" : "Login"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Loading..." : isRegister ? "Register" : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}
