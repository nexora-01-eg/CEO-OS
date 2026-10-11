import { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import { Icon } from "../ui/Icon";
import { IconButton } from "../ui/Button";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="h-20 shrink-0 flex items-center justify-between px-10 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur sticky top-0 z-10">
      <div className="min-w-0">
        <h1 className="text-[20px] font-semibold tracking-tight text-[var(--color-text-primary)] truncate">{title}</h1>
        {subtitle && <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5 truncate">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right hidden md:block" aria-live="off">
          <div className="text-[13px] font-medium text-[var(--color-text-primary)] tabular-nums">
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="text-[11px] text-[var(--color-text-tertiary)]">
            {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
        </div>
        <div className="w-px h-8 bg-[var(--color-border)]" aria-hidden="true" />
        <IconButton icon={<Icon icon={Search} size={17} />} label="Search" />
        <IconButton
          icon={
            <>
              <Icon icon={Bell} size={17} />
              <span
                aria-hidden="true"
                className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] ring-2 ring-[var(--color-bg)]"
              />
            </>
          }
          label="Notifications, 1 unread"
        />
      </div>
    </header>
  );
}
