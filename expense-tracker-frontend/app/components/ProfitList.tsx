"use client";

import { fetchWithAuth } from "../utils/auth";
import { categoryIcons } from "../utils/categoryIcons";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

type Props = {
  profits: {
    _id: string;
    title: string;
    category: string;
    amount: number;
    date?: string;
  }[];
  onDeleted: () => void;
};

export default function ProfitList({ profits, onDeleted }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [profits]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/profits/${id}`, {
      method: "DELETE",
    });

    onDeleted();
  };

  return (
    <ul
      ref={listRef}
      className="space-y-3 mt-3 max-h-[350px] overflow-y-auto pr-1"
    >
      {profits.map((p) => (
        <motion.li
          key={p._id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="p-4 border border-gray-800 rounded-xl bg-gray-900/70 flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {categoryIcons[p.category] || "💰"}
              </span>

              <div>
                <p className="text-sm font-semibold text-gray-100">
                  {p.title}
                </p>
                <p className="text-[11px] uppercase text-gray-500 tracking-wide">
                  {p.category}
                </p>
              </div>
            </div>

            <p className="text-md font-bold text-green-400">{p.amount}₼</p>
          </div>

          {p.date && (
            <p className="text-[11px] text-gray-500">
              {new Date(p.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(p._id)}
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
