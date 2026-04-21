"use client";

import { useEffect, useRef, useState } from "react";
import { generateSignal, getStatusMessages } from "@/lib/signal";
import { useAppStore } from "@/store/useAppStore";
import { CircularProgress } from "./CircularProgress";
import { GlassCard } from "./GlassCard";

const MAIN_STATUS = "Preparing Aviator prediction...";

/** Linear 0–100% over wall-clock time (8–10s). Matches ring and number. */
function linearProgress(elapsedMs: number, totalMs: number): number {
  if (totalMs <= 0) return 100;
  const t = elapsedMs / totalMs;
  return Math.min(100, Math.max(0, t * 100));
}

export function ProcessingScreen() {
  const goSignal = useAppStore((s) => s.goSignal);

  const [pct, setPct] = useState(0);
  const [subStatus, setSubStatus] = useState(() => getStatusMessages()[0]);
  const doneRef = useRef(false);
  const subTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const durationMs = 3000 + Math.random() * 2000;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, linearProgress(elapsed, durationMs));
      setPct(p);

      if (elapsed < durationMs) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (!doneRef.current) {
        doneRef.current = true;
        const wait = 500 + Math.random() * 500;
        window.setTimeout(() => {
          const signal = generateSignal();
          goSignal(signal);
        }, wait);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [goSignal]);

  useEffect(() => {
    const messages = [...getStatusMessages()];
    let i = 0;
    let cancelled = false;
    const step = () => {
      const delay = 1000 + Math.random() * 1000;
      subTimerRef.current = window.setTimeout(() => {
        if (cancelled) return;
        i = (i + 1) % messages.length;
        setSubStatus(messages[i] ?? MAIN_STATUS);
        step();
      }, delay);
    };
    step();
    return () => {
      cancelled = true;
      if (subTimerRef.current != null) clearTimeout(subTimerRef.current);
    };
  }, []);

  return (
    <div className="animate-fade-in flex min-h-[70vh] flex-col items-center px-4 pb-28 pt-8">
      <header className="mb-10 text-center">
        <p className="text-3xl">✈️</p>
        <h2 className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-2xl font-black tracking-tight text-transparent">
          AVIATOR AI ENGINE
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/60">
          Signal loading
        </p>
      </header>

      <div className="flex flex-col items-center">
        <CircularProgress value={pct} size={220} stroke={12} />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-red-300/90">
          Processing
        </p>
      </div>

      <div className="mt-10 w-full max-w-md space-y-2 text-center">
        <p className="text-sm font-medium text-slate-200">{MAIN_STATUS}</p>
        <p className="min-h-[1.25rem] text-xs text-slate-500 transition-all duration-300">
          {subStatus}
        </p>
      </div>

      <GlassCard className="mt-10 w-full max-w-md p-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-red-200/60">
          Bot actions
        </p>
        <dl className="space-y-2 text-sm text-slate-200">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">History scan</dt>
            <dd className="text-right font-medium">Complete</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Sync check</dt>
            <dd className="text-right font-medium">Complete</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Risk profile build</dt>
            <dd className="text-right font-medium">Running</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Prediction output</dt>
            <dd className="text-right font-medium text-red-300">Preparing</dd>
          </div>
        </dl>
      </GlassCard>
    </div>
  );
}
