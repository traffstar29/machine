import type { AppLocale } from "./i18n";
import { getTranslations } from "./i18n";

export type GeneratedSignal = {
  targetCoefficient: string;
};

type CoefficientBand = {
  min: number;
  max: number;
  weight: number;
};

const COEFFICIENT_BANDS: CoefficientBand[] = [
  { min: 1.05, max: 1.39, weight: 75 },
  { min: 1.4, max: 2.0, weight: 15 },
  { min: 2.01, max: 100.0, weight: 10 },
];

function pickBand(rand: () => number): CoefficientBand {
  const totalWeight = COEFFICIENT_BANDS.reduce((sum, band) => sum + band.weight, 0);
  const pick = rand() * totalWeight;
  let acc = 0;

  for (const band of COEFFICIENT_BANDS) {
    acc += band.weight;
    if (pick <= acc) return band;
  }

  return COEFFICIENT_BANDS[COEFFICIENT_BANDS.length - 1]!;
}

export function computeTargetCoefficient(rand: () => number = Math.random): number {
  const band = pickBand(rand);
  return band.min + rand() * (band.max - band.min);
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
