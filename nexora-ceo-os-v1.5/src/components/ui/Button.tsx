import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; icon?: ReactNode; loading?: boolean; children: ReactNode }
>(function Button({ children, variant = "primary", size = "md", className, icon, loading = false, disabled, ...rest }, ref) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium " +
    "transition-[background-color,border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-premium)] " +
    "active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none select-none";

  const sizes: Record<Size, string> = {
    sm: "px-3 py-2 text-[12.5px]",
    md: "px-4 py-2.5 text-[13px]",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-[var(--color-gold)] text-[#0B0B0D] hover:bg-[var(--color-gold-soft)] shadow-[0_4px_16px_-4px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_20px_-4px_rgba(212,175,55,0.5)]",
    secondary:
      "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-gold-dim)] hover:bg-[var(--color-card-hover)]",
    ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.05]",
    danger: "bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20",
  };

  return (
    <button ref={ref} className={clsx(base, sizes[size], variants[variant], className)} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {loading ? (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
});
