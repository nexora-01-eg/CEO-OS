import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  loading = false,
  disabled,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium " +
    "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] " +
    "active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

  const sizes: Record<Size, string> = {
    sm: "px-3 py-2 text-[12px]",
    md: "px-4 py-2.5 text-[13px]",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-[var(--color-gold)] text-[#0B0B0D] hover:bg-[var(--color-gold-soft)] shadow-[var(--shadow-gold-sm)] hover:shadow-[var(--shadow-gold-md)]",
    secondary:
      "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-gold-dim)] hover:bg-[var(--color-card-hover)]",
    ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5",
    danger: "bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20",
  };

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Loader2 size={15} strokeWidth={1.75} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}

/** Square icon-only button — used in Topbar and toolbars. Enforces a labelled, accessible target. */
export function IconButton({
  icon,
  label,
  className,
  variant = "secondary",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  label: string;
  variant?: "secondary" | "ghost";
}) {
  const variants = {
    secondary:
      "border border-[var(--color-border)] hover:border-[var(--color-gold-dim)] hover:bg-[var(--color-card-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5",
  };
  return (
    <button
      aria-label={label}
      title={label}
      className={clsx(
        "relative w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center",
        "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        variants[variant],
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
