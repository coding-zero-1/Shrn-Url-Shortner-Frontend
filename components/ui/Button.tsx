import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-[0_12px_28px_rgba(14,165,233,0.35)] hover:brightness-110 active:scale-[0.98]",
    secondary:
      "border border-slate-500/35 bg-slate-900/55 text-slate-100 hover:bg-slate-800/70 active:scale-[0.98]",
    danger:
      "bg-gradient-to-r from-red-400 to-rose-500 text-slate-950 shadow-[0_12px_24px_rgba(244,63,94,0.3)] hover:brightness-110 active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-300 hover:bg-slate-800/45 hover:text-slate-100 active:scale-[0.98]",
  };

  return (
    <button
      className={twMerge(baseStyles, variants[variant], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
