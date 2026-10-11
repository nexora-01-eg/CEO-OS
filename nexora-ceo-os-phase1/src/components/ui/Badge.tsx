import clsx from "clsx";
import type { Priority } from "../../lib/db";

const priorityStyles: Record<Priority, string> = {
  Low: "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  Medium: "text-[var(--color-text-secondary)] bg-white/5 border-white/10",
  High: "text-[var(--color-warning)] bg-[var(--color-warning)]/10 border-[var(--color-warning)]/25",
  Critical: "text-[var(--color-danger)] bg-[var(--color-danger)]/10 border-[var(--color-danger)]/25",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border", priorityStyles[priority])}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}

const stageTone: Record<string, string> = {
  Idea: "text-[var(--color-text-secondary)] bg-white/5 border-white/10",
  Research: "text-[var(--color-text-secondary)] bg-white/5 border-white/10",
  Hook: "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  Writing: "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  Caption: "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  CTA: "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  "First Comment": "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  Hashtags: "text-[var(--color-info)] bg-[var(--color-info)]/10 border-[var(--color-info)]/25",
  "Design Notes": "text-[var(--color-gold)] bg-[var(--color-gold)]/10 border-[var(--color-gold)]/25",
  Review: "text-[var(--color-warning)] bg-[var(--color-warning)]/10 border-[var(--color-warning)]/25",
  Approved: "text-[var(--color-success)] bg-[var(--color-success)]/10 border-[var(--color-success)]/25",
  Scheduled: "text-[var(--color-success)] bg-[var(--color-success)]/10 border-[var(--color-success)]/25",
  Published: "text-[var(--color-gold)] bg-[var(--color-gold)]/15 border-[var(--color-gold)]/30",
  "Performance Review": "text-[var(--color-text-secondary)] bg-white/5 border-white/10",
  Archive: "text-[var(--color-text-tertiary)] bg-white/5 border-white/10",
};

export function StageBadge({ stage }: { stage: string }) {
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border whitespace-nowrap", stageTone[stage] ?? "text-[var(--color-text-secondary)] bg-white/5 border-white/10")}>
      {stage}
    </span>
  );
}
