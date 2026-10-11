import clsx from "clsx";

/** Base shimmer block — compose into any shape via className. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("skeleton", className)} aria-hidden="true" />;
}

/** Pre-built skeleton matching Card + CardHeader proportions, for full-card loading states. */
export function CardSkeleton({ className, lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div
      className={clsx(
        "bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6",
        className
      )}
      aria-hidden="true"
    >
      <Skeleton className="h-4 w-1/3 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-5" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

/** Skeleton for a single KPI stat card. */
export function StatSkeleton() {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5" aria-hidden="true">
      <Skeleton className="h-3 w-20 mb-3" />
      <Skeleton className="h-7 w-10" />
    </div>
  );
}
