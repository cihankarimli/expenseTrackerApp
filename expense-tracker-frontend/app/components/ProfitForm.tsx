"use client";

import { useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { fetchWithAuth } from "../utils/auth";

export default function ProfitForm({ onAdded }: any) {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("salary");

  const submit = async (e: any) => {
    e.preventDefault();

    await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/profits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, title, category }),
    });

    setAmount("");
    setTitle("");
    onAdded();
  };

  return (
    <form onSubmit={submit} className="space-y-3 mt-2">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button className="w-full">Add Profit</Button>
    </form>
  );
}
