"use client";

import { useAppStore } from "@/store/useAppStore";
import aviatorLogo from "../../aviator.png";
import { GlassCard } from "./GlassCard";

export function SettingsScreen() {
  const goProcessing = useAppStore((s) => s.goProcessing);

  return (
    <div className="animate-fade-in pb-24 pt-3">
      <header className="mb-6 flex flex-col items-center text-center">
        <img src={aviatorLogo.src} alt="Aviator logo" className="h-auto w-40" />
        <h1 className="mt-3 bg-gradient-to-r from-red-300 via-white to-red-200 bg-clip-text text-3xl font-black tracking-tight text-transparent">
          PROFIT MACHINE
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.26em] text-red-200/70">
          Signal Assistant
        </p>
      </header>

      <div className="mx-auto flex max-w-lg flex-col gap-4">
        <GlassCard className="p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70">
            How to use
          </p>
          <ol className="space-y-3 text-sm leading-relaxed text-slate-100">
            <li>
              1. The app predicts Aviator outcomes and shows where you should cash
              out.
            </li>
            <li>
              2. The app shows up to what coefficient value you should exit the
              round.
            </li>
            <li>
              3. The coefficient in the app and in the game may differ, but our
              signal shows an exit point designed to keep your session profitable.
            </li>
            <li>
              4. Before main play, sync your account with a few minimum-bet rounds.
            </li>
            <li>
              5. Synchronization improves signal precision. Then begin normal
              sessions.
            </li>
          </ol>
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
