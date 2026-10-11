import type { LucideIcon } from "lucide-react";

export function Icon({
  icon: IconCmp,
  size = 18,
  className = "",
  decorative = true,
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  return <IconCmp size={size} strokeWidth={1.75} className={className} aria-hidden={decorative || undefined} focusable="false" />;
}
