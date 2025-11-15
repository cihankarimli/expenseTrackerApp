"use client";

import { useState } from "react";
import { fetchWithAuth } from "../utils/auth";

type Props = {
  onAdded: () => void;
};

export default function ProfitForm({ onAdded }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("other");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/profits`, {
        method: "POST",
        body: JSON.stringify({ title, amount, category }),
      });
      setTitle("");
      setAmount(0);
      setCategory("other");
      onAdded();
    } catch (err: any) {
      alert(err.message || "Error adding profit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4"
    >
      <h3 className="font-semibold text-gray-100 mb-3 text-sm uppercase tracking-wide">
        Add Profit
      </h3>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />

        <div className="flex gap-3 flex-wrap">
          <input
            type="number"
            placeholder="Amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="w-32 border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 min-w-[120px] border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="investment">Investment</option>
            <option value="gift">Gift</option>
            <option value="other_profit">Other</option>


          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {submitting ? "Saving..." : "Add Profit"}
        </button>
      </div>
    </form>
  );
}
