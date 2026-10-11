import { Topbar } from "../components/layout/Topbar";
import { Icon } from "../components/ui/Icon";
import type { LucideIcon } from "lucide-react";

export function ComingSoon({ title, icon, note }: { title: string; icon: LucideIcon; note: string }) {
  return (
    <>
      <Topbar title={title} />
      <main className="px-10 py-8">
        <div className="animate-fade-up border border-dashed border-[var(--color-border)] rounded-[var(--radius-xl)] h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center">
            <Icon icon={icon} size={26} className="text-[var(--color-gold)]" />
          </div>
          <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)]">{title}</h2>
          <p className="text-[13px] text-[var(--color-text-secondary)] max-w-sm leading-relaxed">{note}</p>
          <span className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] px-3 py-1 rounded-full border border-[var(--color-border)]">
            Coming in a future phase
          </span>
        </div>
      </main>
    </>
  );
}
