import type { KeyboardEvent, ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  hover = false,
  onClick,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  /** Render as a <section> for landmark semantics when the card is a standalone widget. */
  as?: "div" | "section";
}) {
  const interactive = Boolean(onClick);
  const Tag = as as "div";

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <Tag
      onClick={onClick}
      onKeyDown={interactive ? handleKeyDown : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={clsx(
        "bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)]",
        "shadow-[var(--shadow-xs)]",
        "transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)]",
        (hover || interactive) &&
          "hover:border-[var(--color-gold-dim)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] cursor-pointer",
        interactive && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between px-6 pt-6 pb-4 gap-4">
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] tracking-tight truncate">{title}</h3>
        {subtitle && <p className="text-[13px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
