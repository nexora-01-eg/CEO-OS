import clsx from "clsx";

export function ProgressBar({
  value,
  className,
  tone = "gold",
}: {
  value: number;
  className?: string;
  tone?: "gold" | "success" | "warning" | "danger" | "info";
}) {
  const toneMap: Record<string, string> = {
    gold: "bg-gradient-to-r from-[#E8C766] to-[#D4AF37]",
    success: "bg-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]",
    danger: "bg-[var(--color-danger)]",
    info: "bg-[var(--color-info)]",
  };
  return (
    <div className={clsx("w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden", className)}>
      <div
        className={clsx("h-full rounded-full transition-[width] duration-700", toneMap[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, transitionTimingFunction: "var(--ease-premium)" }}
      />
    </div>
  );
}
