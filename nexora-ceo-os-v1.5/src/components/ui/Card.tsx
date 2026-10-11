import type { KeyboardEvent, ReactNode, CSSProperties } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  hover = false,
  onClick,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  as?: "div" | "section" | "article";
  style?: CSSProperties;
}) {
  const Tag = as as any;
  const interactive = Boolean(onClick);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Tag
      onClick={onClick}
      onKeyDown={interactive ? handleKeyDown : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={style}
      className={clsx(
        "bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)]",
        "transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-premium)]",
        (hover || interactive) &&
          "hover:border-[var(--color-gold-dim)] hover:shadow-[var(--shadow-md)] cursor-pointer",
        interactive && "focus-visible:shadow-[var(--shadow-md)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)] tracking-tight truncate">{title}</h2>
        {subtitle && <p className="text-[13px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
