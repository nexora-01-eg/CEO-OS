export function ProgressRing({
  value,
  size = 96,
  stroke = 8,
  label,
  sublabel,
}: {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  const gradId = `ring-grad-${size}-${stroke}`;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={sublabel ?? label ?? "Progress"}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C766" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-border)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s var(--ease-premium)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[var(--color-text-primary)] font-bold tabular-nums" style={{ fontSize: size * 0.22 }}>
          {Math.round(value)}%
        </span>
        {label && <span className="text-[var(--color-text-tertiary)] text-[10px] mt-0.5">{label}</span>}
      </div>
      {sublabel && (
        <span className="absolute -bottom-6 text-[11px] text-[var(--color-text-secondary)] whitespace-nowrap">{sublabel}</span>
      )}
    </div>
  );
}
