"use client";

import { RateLimitNotice } from "@/components/RateLimitNotice";
import { useTranslations } from "@/hooks/useTranslations";
import { useAppStore } from "@/store/useAppStore";
import aviatorLogo from "../../aviator.png";
import { GlassCard } from "./GlassCard";

export function SettingsScreen() {
  const goProcessing = useAppStore((s) => s.goProcessing);
  const refreshSignalQuota = useAppStore((s) => s.refreshSignalQuota);
  const quota = useAppStore((s) => s.signalQuota);
  const t = useTranslations();

  const isBlocked = quota?.isBlocked ?? false;

  return (
    <div className="animate-fade-in pb-24 pt-3">
      <header className="mb-6 flex flex-col items-center text-center">
        <img src={aviatorLogo.src} alt={t.aviatorLogoAlt} className="h-auto w-40" />
        <h1 className="mt-3 bg-gradient-to-r from-red-300 via-white to-red-200 bg-clip-text text-3xl font-black tracking-tight text-transparent">
          PROFIT MACHINE
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.26em] text-red-200/70">
          {t.brandTagline}
        </p>
      </header>

      <div className="mx-auto flex max-w-lg flex-col gap-4">
        <RateLimitNotice />

        <GlassCard className="p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70">
            {t.howToUse}
          </p>
          <ol className="space-y-3 text-sm leading-relaxed text-slate-100">
            {t.howToSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </GlassCard>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#190308]/90 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={() => {
              refreshSignalQuota();
              goProcessing();
            }}
            disabled={isBlocked}
            className="w-full rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-rose-600 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-glow transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
          >
            {t.start}
          </button>
        </div>
      </div>
    </div>
  );
}
