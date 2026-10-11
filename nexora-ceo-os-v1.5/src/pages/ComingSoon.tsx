import { Topbar } from "../components/layout/Topbar";
import { Icon } from "../components/ui/Icon";
import type { LucideIcon } from "lucide-react";

export function ComingSoon({ title, icon, note }: { title: string; icon: LucideIcon; note: string }) {
  return (
    <>
      <Topbar title={title} />
      <main className="px-6 lg:px-10 py-8">
        <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border)] min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center">
            <Icon icon={icon} size={26} className="text-[var(--color-gold)]" />
          </div>
          <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)]">{title}</h2>
          <p className="text-[13px] text-[var(--color-text-secondary)] max-w-sm leading-relaxed">{note}</p>
        </div>
      </main>
    </>
  );
}
