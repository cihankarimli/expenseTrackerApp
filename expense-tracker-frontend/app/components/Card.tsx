"use client";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#020617]/70 backdrop-blur-xl border border-white/10 
      shadow-[0_18px_45px_rgba(15,23,42,0.85)] rounded-2xl p-6 
      transition-all duration-300 
      hover:border-white/20 hover:shadow-[0_0_45px_rgba(59,130,246,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}
