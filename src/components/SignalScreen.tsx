"use client";

import { RateLimitNotice } from "@/components/RateLimitNotice";
import { useTranslations } from "@/hooks/useTranslations";
import { useAppStore } from "@/store/useAppStore";
import aviatorLogo from "../../aviator.png";
import { GlassCard } from "./GlassCard";

export function SignalScreen() {
  const signal = useAppStore((s) => s.signal);
  const goSettings = useAppStore((s) => s.goSettings);
  const goProcessing = useAppStore((s) => s.goProcessing);
  const refreshSignalQuota = useAppStore((s) => s.refreshSignalQuota);
  const syncSignalsDone = useAppStore((s) => s.syncSignalsDone);
  const syncSignalsTarget = useAppStore((s) => s.syncSignalsTarget);
  const quota = useAppStore((s) => s.signalQuota);
  const t = useTranslations();

  if (!signal) return null;

  const isBlocked = quota?.isBlocked ?? false;
  const syncPercent = Math.min(
    100,
    Math.round((syncSignalsDone / Math.max(syncSignalsTarget, 1)) * 100)
  );
  const syncDone = syncPercent >= 100;

  return (
    <div className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-1">
      <header className="mb-2 text-center">
        <img src={aviatorLogo.src} alt={t.aviatorLogoAlt} className="mx-auto h-auto w-28" />
        <h2 className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-xl font-black tracking-tight text-transparent">
          PROFIT MACHINE
        </h2>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.26em] text-red-200/60">
          {t.predictionReady}
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center gap-2">
        <RateLimitNotice />

        <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-200">
          {t.signalLabel}
        </p>

        <div className="w-full rounded-2xl border border-red-400/40 bg-red-500/10 px-6 py-5 shadow-[0_0_28px_rgba(239,68,68,0.22)]">
          <div className="text-center text-4xl font-black tracking-tight text-red-300 sm:text-5xl">
            {signal.targetCoefficient}
          </div>
        </div>

        <GlassCard className="w-full p-3.5" glow>
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-red-200/70">
            <span>{t.appSync}</span>
            <span>{syncPercent}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-500"
              style={{ width: `${syncPercent}%` }}
            />
          </div>
          {!syncDone ? (
            <p className="mt-2 text-[11px] leading-snug text-slate-400">{t.syncInProgress}</p>
          ) : (
            <p className="mt-2 text-[11px] font-semibold leading-snug text-emerald-300">
              {t.syncComplete}
            </p>
          )}
        </GlassCard>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#190308]/90 px-4 py-2.5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              refreshSignalQuota();
              goProcessing();
            }}
            disabled={isBlocked}
            className="flex-1 rounded-2xl border border-red-400/40 bg-red-500/20 py-3 text-xs font-bold uppercase tracking-wider text-red-100 transition hover:bg-red-500/30 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
          >
            {t.getNextSignal}
          </button>
          <button
            type="button"
            onClick={() => goSettings()}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10 sm:text-sm"
          >
            {t.backToMenu}
          </button>
        </div>
      </div>
    </div>
  );
}
