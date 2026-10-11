import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  children,
  variant = "primary",
  className,
  icon,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; icon?: ReactNode; children: ReactNode }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 py-2.5 text-[13px] font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    primary: "bg-[var(--color-gold)] text-[#0B0B0D] hover:bg-[var(--color-gold-soft)] shadow-[0_4px_16px_-4px_rgba(212,175,55,0.4)]",
    secondary: "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-gold-dim)] hover:bg-[var(--color-card-hover)]",
    ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5",
    danger: "bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}
