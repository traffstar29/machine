import type { AppLocale } from "./i18n";
import { getTranslations } from "./i18n";

export type GeneratedSignal = {
  targetCoefficient: string;
};

/** Aviator return-to-player (house edge ~3%). */
const AVIATOR_RTP = 0.97;

const COEFFICIENT_MIN = 1.05;
const COEFFICIENT_MAX = 100;

/** Win-rate band for the high-frequency zone (avg ≈ 75%). */
const CORE_WIN_RATE_MIN = 0.7;
const CORE_WIN_RATE_MAX = 0.8;

/** Share of signals in the ~75% win-rate zone (m ≈ 1.05x–1.39x). */
const CORE_ZONE_WEIGHT = 0.75;

function clampCoefficient(m: number): number {
  return Math.min(COEFFICIENT_MAX, Math.max(COEFFICIENT_MIN, m));
}

/**
 * m = RTP / p. Most draws target ~75% round win rate; tail spans up to 100x.
 */
export function computeTargetCoefficient(rand: () => number = Math.random): number {
  if (rand() < CORE_ZONE_WEIGHT) {
    const p =
      CORE_WIN_RATE_MIN + rand() * (CORE_WIN_RATE_MAX - CORE_WIN_RATE_MIN);
    return clampCoefficient(AVIATOR_RTP / p);
  }

  const logMin = Math.log(COEFFICIENT_MIN);
  const logMax = Math.log(COEFFICIENT_MAX);
  const m = Math.exp(logMin + rand() * (logMax - logMin));

  return clampCoefficient(m);
}

function formatCoefficient(value: number): string {
  const truncated = Math.floor(value * 100) / 100;
  return truncated.toFixed(2).replace(".", ",");
}

export function getStatusMessages(locale: AppLocale): readonly string[] {
  return getTranslations(locale).statusMessages;
}

export function getRandomSignalTargetCount(): number {
  return 8 + Math.floor(Math.random() * 5);
}

export function generateSignal(locale: AppLocale): GeneratedSignal {
  const formatted = formatCoefficient(computeTargetCoefficient());
  const t = getTranslations(locale);

  return {
    targetCoefficient: t.exitBefore(formatted),
  };
}
