"use client";

import { fetchWithAuth } from "../utils/auth";
import { categoryIcons } from "../utils/CategoryIcons";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  amounts: {
    _id: string;
    category: string;
    amount: number;
    type: string;
    note?: string;
    date?: string;
  }[];
  onDeleted: () => void;
};

export default function AmountList({ amounts, onDeleted }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  /** 🟦 Yeni item gələndə auto-scroll Top */
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [amounts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/amounts/${id}`, {
        method: "DELETE",
      });
      onDeleted();
    } catch (err: any) {
      alert(err?.message || "Unknown error");
    }
  };

  if (!amounts.length) {
    return <p className="text-xs text-gray-500 mt-2">No expenses found.</p>;
  }

  return (
    <ul
      ref={listRef}
      className="space-y-3 mt-3 max-h-[350px] overflow-y-auto pr-1"
    >
      {amounts.map((a) => (
        <motion.li
          key={a._id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }} // ⭐ instant görünmə
          className="p-4 border border-gray-800 rounded-xl bg-gray-900/70 flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-xl">{categoryIcons[a.category] || "📝"}</span>

              <div>
                <p className="text-sm font-semibold text-gray-100">
                  {a.category.charAt(0).toUpperCase() + a.category.slice(1)}
                </p>
                <p className="text-[11px] uppercase text-gray-500 tracking-wide">
                  {a.type}
                </p>
              </div>
            </div>

            <p className="text-md font-bold text-red-400">{a.amount}₼</p>
          </div>

          {a.note && (
            <p className="text-xs text-gray-400 border-l-2 border-gray-600 pl-2">
              {a.note}
            </p>
          )}

          {a.date && (
            <p className="text-[11px] text-gray-500">
              {new Date(a.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(a._id)}
              className="text-red-400 hover:text-red-300 hover:underline text-xs"
            >
              Delete
            </button>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
