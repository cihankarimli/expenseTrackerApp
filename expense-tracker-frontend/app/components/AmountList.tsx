"use client";

import { fetchWithAuth } from "../utils/auth";
import { categoryIcons } from "../utils/CategoryIcons";
import { paymentMethodIcons } from "../utils/PaymentMethodIcons";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  amounts: {
    _id: string;
    category: string;
    amount: number;
    type: string;
    note?: string;
    date?: string;
    method?: string;
  }[];
  onDeleted: () => void;
};

export default function AmountList({ amounts, onDeleted }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  /** Auto scroll to top when new item added */
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [amounts]);

  /** Modal State */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /** Open modal */
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  /** Confirm delete */
  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/amounts/${selectedId}`,
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

  /** Cancel modal */
  const cancelDelete = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  if (!amounts.length) {
    return <p className="text-xs text-gray-500 mt-2">No expenses found.</p>;
  }

  return (
    <>
      {/* LIST */}
      <ul
        ref={listRef}
        className="space-y-3 mt-3 max-h-[350px] overflow-y-auto pr-1"
      >
        {amounts.map((a) => (
          <motion.li
            key={a._id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="p-4 border border-gray-800 rounded-xl bg-gray-900/70 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {categoryIcons[a.category] || "📝"}
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                    {a.category.charAt(0).toUpperCase() + a.category.slice(1)}

                    {a.method && (
                      <span className="inline-flex items-center">
                        {paymentMethodIcons[a.method] ||
                          paymentMethodIcons["other"]}
                      </span>
                    )}
                  </p>

                  <p className="text-[11px] uppercase text-gray-500 tracking-wide">
                    {a.type}
                  </p>

                  {a.method && (
                    <p className="text-[11px] text-gray-400 flex items-center gap-1">
                      Method:
                      {paymentMethodIcons[a.method] ||
                        paymentMethodIcons["other"]}
                      <span>{a.method}</span>
                    </p>
                  )}
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
                onClick={() => handleDeleteClick(a._id)}
                className="text-red-400 hover:text-red-300 hover:underline text-xs"
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 w-[300px] text-center shadow-xl">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Delete Expense?
            </h3>

            <p className="text-sm text-gray-400 mb-5">
              Are you sure you want to delete this entry?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
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
