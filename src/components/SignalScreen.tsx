"use client";

import { useAppStore } from "@/store/useAppStore";
import aviatorLogo from "../../aviator.png";
import { GlassCard } from "./GlassCard";

export function SignalScreen() {
  const signal = useAppStore((s) => s.signal);
  const goSettings = useAppStore((s) => s.goSettings);
  const goProcessing = useAppStore((s) => s.goProcessing);
  const syncSignalsDone = useAppStore((s) => s.syncSignalsDone);
  const syncSignalsTarget = useAppStore((s) => s.syncSignalsTarget);

  if (!signal) return null;

  const syncPercent = Math.min(
    100,
    Math.round((syncSignalsDone / Math.max(syncSignalsTarget, 1)) * 100)
  );
  const syncDone = syncPercent >= 100;

  return (
    <div className="animate-fade-in pb-28 pt-6">
      <header className="mb-8 text-center">
        <img src={aviatorLogo.src} alt="Aviator logo" className="mx-auto h-auto w-44" />
        <h2 className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-2xl font-black tracking-tight text-transparent">
          PROFIT MACHINE
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/60">
          Prediction ready
        </p>
      </header>

      <div className="mx-auto flex max-w-lg flex-col items-center gap-6">
        <p className="max-w-[95%] text-center text-sm font-semibold uppercase leading-snug tracking-[0.14em] text-slate-200 sm:text-base sm:tracking-[0.18em]">
          Signal
        </p>

        <div className="rounded-3xl border border-red-400/40 bg-red-500/10 px-10 py-8 shadow-[0_0_35px_rgba(239,68,68,0.25)]">
          <div className="text-center text-5xl font-black tracking-tight text-red-300 sm:text-6xl">
            {signal.targetCoefficient}
          </div>
        </div>

        <GlassCard className="w-full p-6" glow>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-red-200/70">
            <span>App synchronization</span>
            <span>{syncPercent}%</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-500"
              style={{ width: `${syncPercent}%` }}
            />
          </div>
          {!syncDone ? (
            <p className="mt-3 text-xs text-slate-400">
              This field is filled with each new signal. After full completion,
              the bot will operate with high accuracy.
            </p>
          ) : (
            <p className="mt-3 text-xs font-semibold text-emerald-300">
              The app is now operating with high accuracy.
            </p>
          )}
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
