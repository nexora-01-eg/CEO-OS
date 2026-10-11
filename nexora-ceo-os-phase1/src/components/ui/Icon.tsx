import type { LucideIcon } from "lucide-react";

export function Icon({
  icon: IconCmp,
  size = 18,
  className = "",
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  return <IconCmp size={size} strokeWidth={1.75} className={className} />;
}
