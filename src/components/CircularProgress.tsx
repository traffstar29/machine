"use client";

import { useId } from "react";

type Props = {
  value: number;
  size?: number;
  stroke?: number;
};

/**
 * Ring progress: stroke length matches `value` (0–100) linearly.
 * No extra filters — better rendering in Telegram WebView.
 */
export function CircularProgress({
  value,
  size = 200,
  stroke = 10,
}: Props) {
  const uid = useId();
  const gradId = `progGrad-${uid}`;

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const offset = c * (1 - pct / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c}`}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-bold tabular-nums text-white">
          {Math.round(pct)}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/65">
          %
        </span>
      </div>
    </div>
  );
}
