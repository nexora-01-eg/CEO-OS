import type { LucideIcon } from "lucide-react";
import { Icon } from "./Icon";

export function EmptyState({
  icon,
  title,
  note,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  note?: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "py-8" : "py-14"}`}>
      <div className={`rounded-full bg-white/[0.04] border border-[var(--color-border)] flex items-center justify-center mb-3 ${compact ? "w-10 h-10" : "w-14 h-14"}`}>
        <Icon icon={icon} size={compact ? 16 : 20} className="text-[var(--color-text-tertiary)]" />
      </div>
      <p className="text-[13px] font-medium text-[var(--color-text-secondary)]">{title}</p>
      {note && <p className="text-[12px] text-[var(--color-text-tertiary)] mt-1 max-w-[220px]">{note}</p>}
    </div>
  );
}
