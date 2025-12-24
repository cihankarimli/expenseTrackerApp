"use client";

import { fetchWithAuth } from "../utils/auth";
import { categoryIcons } from "../utils/CategoryIcons";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/profits/${selectedId}`,
        {
          method: "DELETE",
        }
      );
      setModalOpen(false);
      setSelectedId(null);
      onDeleted();
    } catch (err: any) {
      alert(err?.message || "Unknown error");
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <ul
        ref={listRef}
        className="space-y-3 mt-3 max-h-[350px] overflow-y-auto pr-1"
      >
        {profits.map((p) => (
          <motion.li
            key={p._id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="
              p-4 rounded-2xl 
              bg-[#1a1d23]/70 
              border border-[#2a2f38]
              shadow-[0_0_12px_rgba(0,0,0,0.35)]
              backdrop-blur-lg
              flex flex-col gap-3
              transition hover:scale-[1.01]
            "
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

            <button
              onClick={() => handleDeleteClick(p._id)}
              className="text-red-400 hover:text-red-300 hover:underline text-xs mt-2 self-end"
            >
              Delete
            </button>
          </motion.li>
        ))}
      </ul>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#13161b] w-[320px] p-6 rounded-2xl border border-[#2a2f38] shadow-[0_0_24px_rgba(0,0,0,0.35)] text-center">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Delete Profit?
            </h3>

            <p className="text-sm text-gray-400 mb-5">
              Are you sure you want to delete this entry?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-xl bg-[#1f242d] text-gray-200 hover:bg-[#262b34]"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
