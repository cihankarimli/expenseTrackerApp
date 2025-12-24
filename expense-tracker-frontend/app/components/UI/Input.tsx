"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
}

export default function Input({
  label,
  error,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      {/* LABEL */}
      {label && (
        <label className="text-sm text-gray-300 font-medium">{label}</label>
      )}

      <div
        className={`
          flex items-center gap-2 
          bg-[#1a1d23] 
          border 
          ${error ? "border-red-500" : "border-[#2a2f38]"}
          rounded-xl
          px-3 py-2 
          focus-within:border-blue-500 
          focus-within:shadow-[0_0_10px_rgba(59,130,246,0.35)]
          transition-all
        `}
      >
        {/* LEFT ICON */}
        {IconLeft && <IconLeft className="w-5 h-5 text-gray-400" />}

        {/* INPUT */}
        <input
          {...props}
          className={`
            flex-1 bg-transparent outline-none border-none 
            text-gray-200 placeholder-gray-500 
            ${className}
          `}
        />

        {/* RIGHT ICON */}
        {IconRight && <IconRight className="w-5 h-5 text-gray-400" />}
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
}
