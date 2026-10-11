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
    <aside className="w-[76px] lg:w-[264px] shrink-0 h-screen sticky top-0 flex flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-[width] duration-[var(--duration-base)] ease-[var(--ease-premium)]">
      <div className="h-20 flex items-center gap-3 px-4 lg:px-6 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 shrink-0 rounded-[var(--radius-sm)] bg-gradient-to-br from-[#E8C766] to-[#8A712A] flex items-center justify-center font-bold text-[#0B0B0D] text-sm">
          N
        </div>
        <div className="hidden lg:block overflow-hidden">
          <div className="text-[14px] font-semibold tracking-tight leading-none whitespace-nowrap">NEXORA</div>
          <div className="text-[10px] text-[var(--color-text-tertiary)] tracking-wide mt-1 whitespace-nowrap">CEO OS</div>
        </div>
      </div>

      <nav className="flex-1 px-2 lg:px-3 py-6 flex flex-col gap-1" aria-label="Primary">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={item.label}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-[13.5px] font-medium justify-center lg:justify-start transition-[background-color,border-color,color] duration-[var(--duration-fast)] ease-[var(--ease-premium)] ${
                isActive
                  ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] border border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon icon={item.icon} size={18} />
                <span className="hidden lg:inline whitespace-nowrap" aria-current={isActive ? "page" : undefined}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="hidden lg:block p-4 mx-3 mb-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Version 1.0</div>
        <div className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">Fully offline. Your data never leaves this device.</div>
      </div>
    </aside>
  );
}
