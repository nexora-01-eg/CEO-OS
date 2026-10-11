import { NavLink } from "react-router-dom";
import { LayoutGrid, Layers, TrendingUp, BarChart3, Settings as SettingsIcon } from "lucide-react";
import { Icon } from "../ui/Icon";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/content-factory", label: "Content Factory", icon: Layers },
  { to: "/sales", label: "Sales", icon: TrendingUp },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Sidebar() {
  return (
    <aside
      aria-label="Primary navigation"
      className="w-[264px] shrink-0 h-screen sticky top-0 flex flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="h-20 flex items-center gap-3 px-6 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-gradient-to-br from-[#E8C766] to-[#8A712A] flex items-center justify-center font-bold text-[#0B0B0D] text-sm shadow-[var(--shadow-gold-sm)] select-none">
          N
        </div>
        <div>
          <div className="text-[14px] font-semibold tracking-tight leading-none">NEXORA</div>
          <div className="text-[10px] text-[var(--color-text-tertiary)] tracking-[0.08em] mt-1 uppercase">CEO OS</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 pl-3.5 pr-3 py-2.5 rounded-[var(--radius-md)] text-[13.5px] font-medium ` +
              `transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] ` +
              `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] ` +
              (isActive
                ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] border border-transparent")
            }
          >
            {({ isActive }) => (
              <>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-[var(--color-gold)] transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] ${
                    isActive ? "h-4 opacity-100" : "h-0 opacity-0"
                  }`}
                />
                <Icon icon={item.icon} size={18} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Version 1.0</div>
        <div className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">Fully offline. Your data never leaves this device.</div>
      </div>
    </aside>
  );
}
