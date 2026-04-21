import { createSeededRandom } from "./seededRandom";

export type GeneratedSignal = {
  targetCoefficient: string;
};

const STATUS_MESSAGES = [
  "Checking recent Aviator rounds...",
  "Synchronizing account telemetry...",
  "Analyzing volatility clusters...",
  "Building crash-point range...",
  "Validating confidence window...",
  "Finalizing prediction signal...",
] as const;

type CoefficientRange = {
  min: number;
  max: number;
  weight: number;
};

const COEFFICIENT_RANGES: CoefficientRange[] = [
  { min: 1.1, max: 1.2, weight: 25 },
  { min: 1.21, max: 2.0, weight: 40 },
  { min: 2.01, max: 5.0, weight: 20 },
  { min: 5.01, max: 10.0, weight: 10 },
  { min: 10.01, max: 50.0, weight: 5 },
];

export function getStatusMessages(): readonly string[] {
  return STATUS_MESSAGES;
}

export function getRandomSignalTargetCount(): number {
  return 3 + Math.floor(Math.random() * 3);
}

function pickWeightedRange(rand: () => number): CoefficientRange {
  const totalWeight = COEFFICIENT_RANGES.reduce((sum, item) => sum + item.weight, 0);
  const pick = rand() * totalWeight;
  let acc = 0;

  for (const item of COEFFICIENT_RANGES) {
    acc += item.weight;
    if (pick <= acc) return item;
  }

  return COEFFICIENT_RANGES[COEFFICIENT_RANGES.length - 1]!;
}

export function generateSignal(): GeneratedSignal {
  const seed = `${Date.now()}:${Math.random()}`;
  const rand = createSeededRandom(seed);
  const range = pickWeightedRange(rand);
  const rawValue = range.min + rand() * (range.max - range.min);
  const truncated = Math.floor(rawValue * 100) / 100;
  const formatted = truncated.toFixed(2).replace(".", ",");

  return {
    targetCoefficient: `Exit before ${formatted}X`,
  };
}
