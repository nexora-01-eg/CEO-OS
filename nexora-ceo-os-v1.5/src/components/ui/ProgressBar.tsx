import clsx from "clsx";

export function ProgressBar({
  value,
  className,
  tone = "gold",
  label,
}: {
  value: number;
  className?: string;
  tone?: "gold" | "success" | "warning" | "danger" | "info";
  label?: string;
}) {
  const toneMap: Record<string, string> = {
    gold: "bg-gradient-to-r from-[#E8C766] to-[#D4AF37]",
    success: "bg-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]",
    danger: "bg-[var(--color-danger)]",
    info: "bg-[var(--color-info)]",
  };
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={clsx("w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={clsx("h-full rounded-full transition-[width] duration-[var(--duration-slow)]", toneMap[tone])}
        style={{ width: `${clamped}%`, transitionTimingFunction: "var(--ease-premium)" }}
      />
    </div>
  );
}
