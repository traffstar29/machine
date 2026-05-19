"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { formatQuotaResetCountdown } from "@/lib/signalQuota";
import { useAppStore } from "@/store/useAppStore";

export function RateLimitNotice() {
  const t = useTranslations();
  const locale = useAppStore((s) => s.locale);
  const quota = useAppStore((s) => s.signalQuota);

  if (!quota) return null;

  if (quota.isBlocked) {
    const countdown = formatQuotaResetCountdown(quota.resetAt, locale);
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
        <p>{t.rateLimitBlocked}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-200/80">
          {t.rateLimitTryAgainIn(countdown)}
        </p>
      </div>
    );
  }

  return (
    <p className="text-center text-xs text-slate-500">
      {t.signalsRemaining(quota.remaining, quota.limit)}
    </p>
  );
}
