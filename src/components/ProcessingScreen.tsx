"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { generateSignal, getStatusMessages } from "@/lib/signal";
import { canRequestSignal } from "@/lib/signalQuota";
import { useAppStore } from "@/store/useAppStore";
import aviatorLogo from "../../aviator.png";
import { CircularProgress } from "./CircularProgress";

/** Linear 0–100% over 3s. Matches ring and number. */
function linearProgress(elapsedMs: number, totalMs: number): number {
  if (totalMs <= 0) return 100;
  const t = elapsedMs / totalMs;
  return Math.min(100, Math.max(0, t * 100));
}

export function ProcessingScreen() {
  const goSignal = useAppStore((s) => s.goSignal);
  const goSettings = useAppStore((s) => s.goSettings);
  const locale = useAppStore((s) => s.locale);
  const t = useTranslations();

  useEffect(() => {
    if (!canRequestSignal()) {
      goSettings();
    }
  }, [goSettings]);

  const [pct, setPct] = useState(0);
  const [subStatus, setSubStatus] = useState(() => getStatusMessages(locale)[0] ?? "");
  const doneRef = useRef(false);
  const subTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const durationMs = 3000;
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
        if (!canRequestSignal()) {
          goSettings();
          return;
        }
        goSignal(generateSignal(locale));
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [goSignal, goSettings, locale]);

  useEffect(() => {
    const messages = [...getStatusMessages(locale)];
    setSubStatus(messages[0] ?? t.preparingPrediction);
    let i = 0;
    let cancelled = false;
    const step = () => {
      const delay = 1000 + Math.random() * 1000;
      subTimerRef.current = window.setTimeout(() => {
        if (cancelled) return;
        i = (i + 1) % messages.length;
        setSubStatus(messages[i] ?? t.preparingPrediction);
        step();
      }, delay);
    };
    step();
    return () => {
      cancelled = true;
      if (subTimerRef.current != null) clearTimeout(subTimerRef.current);
    };
  }, [locale, t.preparingPrediction]);

  return (
    <div className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] flex-col items-center px-4 pt-2">
      <header className="mb-3 text-center">
        <img src={aviatorLogo.src} alt={t.aviatorLogoAlt} className="mx-auto h-auto w-28" />
        <h2 className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-xl font-black tracking-tight text-transparent">
          PROFIT MACHINE
        </h2>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.26em] text-red-200/60">
          {t.signalLoading}
        </p>
      </header>

      <div className="flex flex-col items-center">
        <CircularProgress value={pct} size={168} stroke={10} />
        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-300/90">
          {t.processing}
        </p>
      </div>

      <div className="mt-4 w-full max-w-md space-y-1 text-center">
        <p className="text-xs font-medium text-slate-200">{t.preparingPrediction}</p>
        <p className="min-h-[1rem] text-[11px] text-slate-500 transition-all duration-300">
          {subStatus}
        </p>
      </div>
    </div>
  );
}
