"use client";

import { useState } from "react";
import { fetchWithAuth } from "../utils/auth";

type Props = {
  userId: string;
  onAdded: () => void;
};

export default function AmountForm({ userId, onAdded }: Props) {
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      setSubmitting(true);
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/amounts/users/${userId}/amounts`,
        {
          method: "POST",
          body: JSON.stringify({ category, amount, type, note }),
        }
      );
      setAmount(0);
      setNote("");
      onAdded();
    } catch (err: any) {
      alert(err.message || "Error adding amount");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="font-semibold text-gray-100 mb-3 text-sm uppercase tracking-wide">
        Add Expense
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3 flex-wrap">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 min-w-[120px] border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="w-32 border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-32 border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {submitting ? "Saving..." : "Add Amount"}
        </button>
      </div>
    </form>
  );
}
