"use client";

import { useAppStore } from "@/store/useAppStore";
import { GlassCard } from "./GlassCard";

export function SignalScreen() {
  const signal = useAppStore((s) => s.signal);
  const goSettings = useAppStore((s) => s.goSettings);
  const goProcessing = useAppStore((s) => s.goProcessing);

  if (!signal) return null;

  return (
    <div className="animate-fade-in pb-28 pt-6">
      <header className="mb-8 text-center">
        <p className="text-3xl">✈️</p>
        <h2 className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-2xl font-black tracking-tight text-transparent">
          AVIATOR SIGNAL
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/60">
          Prediction ready
        </p>
      </header>

      <div className="mx-auto flex max-w-lg flex-col items-center gap-6">
        <p className="max-w-[95%] text-center text-sm font-semibold uppercase leading-snug tracking-[0.14em] text-slate-200 sm:text-base sm:tracking-[0.18em]">
          Cash out at or below this coefficient
        </p>

        <div className="rounded-3xl border border-red-400/40 bg-red-500/10 px-10 py-8 shadow-[0_0_35px_rgba(239,68,68,0.25)]">
          <div className="text-center text-6xl font-black tracking-tight text-red-300 sm:text-7xl">
            {signal.targetCoefficient}
          </div>
        </div>

        <GlassCard className="w-full p-6" glow>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70">
            Predicted range
          </p>
          <p className="mt-2 text-center text-2xl font-black text-white">
            {signal.rangeLabel}
          </p>
          <p className="mt-3 text-center text-xs text-slate-400">
            This predictor shows a probable cash-out zone, not an exact crash point.
          </p>
        </GlassCard>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => goProcessing()}
            className="flex-1 rounded-2xl border border-red-400/40 bg-red-500/20 py-4 text-sm font-bold uppercase tracking-wider text-red-100 transition hover:bg-red-500/30"
          >
            Get Next Signal
          </button>
          <button
            type="button"
            onClick={() => goSettings()}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-4 text-sm font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
