"use client";

import { useState } from "react";
import { fetchWithAuth } from "../utils/auth";
import Button from "./UI/Button";

type Props = {
  userId: string;
  onAdded: () => void;
};

export default function AmountForm({ userId, onAdded }: Props) {
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState<string>(""); // STRING olaraq saxlanır
  const [method, setMethod] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    // Convert string → number
    const numAmount = parseFloat(amount);

    // VALIDATION
    if (!method) {
      setError("Please select a payment method");
      return;
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/amounts/users/${userId}/amounts`,
        {
          method: "POST",
          body: JSON.stringify({
            category,
            amount: numAmount,
            method,
            note,
          }),
        }
      );

      // RESET fields
      setAmount("");
      setNote("");
      setMethod("");

      onAdded();
    } catch (err: any) {
      setError("Error: Could not add expense.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMethodChange = (value: string) => {
    setMethod(value);
    if (error) setError(null);
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

          {/* AMOUNT — STRING olaraq saxlanır */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            className="w-32 border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 
             [appearance:textfield] 
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border border-gray-700 bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <select
          value={method}
          onChange={(e) => handleMethodChange(e.target.value)}
          className={`flex-1 min-w-[120px] border ${
            error ? "border-red-500" : "border-gray-700"
          } bg-gray-950 text-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-600" : "focus:ring-blue-600"
          }`}
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="cash">Cash</option>
          <option value="credit card">Credit Card</option>
          <option value="debit card">Debit Card</option>
          <option value="online payment">Online Payment</option>
          <option value="other">Other</option>
        </select>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button type="submit" className=" w-full">
          Add Amount
        </Button>
      </div>
    </form>
  );
}
