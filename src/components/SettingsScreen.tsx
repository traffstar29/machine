"use client";

import { useAppStore } from "@/store/useAppStore";
import aviatorLogo from "../../aviator.png";
import { CircularProgress } from "./CircularProgress";
import { GlassCard } from "./GlassCard";

export function SettingsScreen() {
  const goProcessing = useAppStore((s) => s.goProcessing);
  const syncSignalsDone = useAppStore((s) => s.syncSignalsDone);
  const syncSignalsTarget = useAppStore((s) => s.syncSignalsTarget);
  const syncPercent = Math.min(
    100,
    Math.round((syncSignalsDone / Math.max(syncSignalsTarget, 1)) * 100)
  );

  return (
    <div className="animate-fade-in pb-28 pt-4">
      <header className="mb-8 flex flex-col items-center text-center">
        <img src={aviatorLogo.src} alt="Aviator logo" className="h-auto w-52" />
        <h1 className="mt-5 bg-gradient-to-r from-red-300 via-white to-red-200 bg-clip-text text-3xl font-black tracking-tight text-transparent">
          AI AVIATOR PREDICTOR
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.26em] text-red-200/70">
          Signal Assistant
        </p>
      </header>

      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <GlassCard className="p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70">
            How to use
          </p>
          <ol className="space-y-3 text-sm leading-relaxed text-slate-100">
            <li>
              1. The app predicts Aviator outcomes and shows up to which coefficient
              you should finish the round.
            </li>
            <li>
              2. The app does not guess an exact coefficient - it provides the most
              probable range.
            </li>
            <li>
              3. Before playing, sync your account by making a few games with the
              minimum bet size.
            </li>
            <li>
              4. Synchronization improves signal precision. After sync reaches 100%,
              start your main sessions.
            </li>
          </ol>
        </GlassCard>

        <GlassCard className="p-5" glow>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70">
            App synchronization
          </p>
          <div className="mt-4 flex items-center justify-center">
            <CircularProgress value={syncPercent} size={160} stroke={10} />
          </div>
          <p className="mt-4 text-center text-xs text-slate-300">
            Filled with every new signal. Usually reaches 100% after{" "}
            {syncSignalsTarget} signals.
          </p>
        </GlassCard>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#190308]/90 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={goProcessing}
            className="w-full rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-rose-600 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-glow transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}
