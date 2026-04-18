import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, labelClassName, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            className={twMerge("text-sm font-medium text-slate-300", labelClassName)}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/70",
            error ? "border-rose-400/70 focus:ring-rose-300/70" : "",
            className,
          )}
          {...props}
        />
        {error && <span className="text-xs text-rose-300">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
