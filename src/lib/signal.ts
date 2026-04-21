import { createSeededRandom } from "./seededRandom";

export type GeneratedSignal = {
  targetCoefficient: string;
  rangeLabel: string;
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
  label: string;
};

const COEFFICIENT_RANGES: CoefficientRange[] = [
  { min: 1.1, max: 1.2, weight: 25, label: "1.10x - 1.20x" },
  { min: 1.3, max: 2.0, weight: 45, label: "1.30x - 2.00x" },
  { min: 2.1, max: 10.0, weight: 20, label: "2.10x - 10.00x" },
  { min: 10.0, max: 50.0, weight: 10, label: "10.00x - 50.00x" },
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

  return {
    targetCoefficient: `${rawValue.toFixed(2)}x`,
    rangeLabel: range.label,
  };
}
