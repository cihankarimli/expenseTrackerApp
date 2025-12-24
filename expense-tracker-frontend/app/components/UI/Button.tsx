"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "subtle";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants: Record<string, string> = {
    primary:
      "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.35)]",
    danger:
      "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.35)]",
    subtle:
      "bg-[#1f242d] hover:bg-[#262b34] text-gray-200 border border-[#2a2f38]",
  };

  return (
    <button
      {...props}
      className={`
        px-4 py-2 rounded-xl 
        transition-all active:scale-[0.97]
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
