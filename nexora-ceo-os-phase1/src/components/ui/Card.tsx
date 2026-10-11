import type { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  hover = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)]",
        "transition-all duration-300",
        hover && "hover:border-[var(--color-gold-dim)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between px-6 pt-6 pb-4">
      <div>
        <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] tracking-tight">{title}</h3>
        {subtitle && <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
