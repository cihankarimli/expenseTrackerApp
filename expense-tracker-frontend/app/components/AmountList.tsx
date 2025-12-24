"use client";

import { fetchWithAuth } from "../utils/auth";
import { categoryIcons } from "../utils/CategoryIcons";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { paymentMethodIcons } from "../utils/PaymentMethodIcons";

export default function AmountList({ amounts, onDeleted }: any) {
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTo({ top: 0, behavior: "instant" });
  }, [amounts]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const openDelete = (id: string) => {
    setSelected(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selected) return;

    await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/amounts/${selected}`,
      { method: "DELETE" }
    );

    setSelected(null);
    setModalOpen(false);
    onDeleted();
  };

  return (
    <>
      <ul
        ref={listRef}
        className="max-h-[350px] overflow-y-auto space-y-3 pr-1 mt-3"
      >
        {amounts.map((item: any) => (
          <motion.li
            key={item._id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              p-4 rounded-2xl 
              bg-[#1a1d23]/70 
              border border-[#2a2f38]
              backdrop-blur-lg 
              shadow-[0_0_12px_rgba(0,0,0,0.35)]
              hover:scale-[1.01] transition
              flex flex-col gap-3
            "
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-xl">{categoryIcons[item.category]}</span>

                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    {item.title}
                  </p>
                  <p className="text-xs uppercase text-gray-500">
                    {item.category}
                  </p>
                  <div>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <span>{paymentMethodIcons[item.method]}</span>
                      <p className="text-sm text-gray-300">{item.method}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-md font-bold text-red-400">-{item.amount}₼</p>
            </div>

            <button
              onClick={() => openDelete(item._id)}
              className="text-red-400 hover:text-red-300 underline text-xs self-end"
            >
              Delete
            </button>
          </motion.li>
        ))}
      </ul>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#13161b] border border-[#2a2f38] p-6 rounded-2xl w-[320px] text-center shadow-[0_0_24px_rgba(0,0,0,0.35)]">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Delete Expense?
            </h3>

            <p className="text-gray-400 text-sm mb-5">
              Are you sure you want to delete this?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#1f242d] text-gray-200 hover:bg-[#262b34]"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
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
