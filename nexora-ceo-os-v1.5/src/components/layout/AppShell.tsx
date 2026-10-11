import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:rounded-[var(--radius-md)] focus:bg-[var(--color-gold)] focus:text-[#0B0B0D] focus:text-[13px] focus:font-medium"
      >
        Skip to content
      </a>
      <Sidebar />
      <div id="main-content" className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
