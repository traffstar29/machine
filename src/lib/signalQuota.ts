const STORAGE_KEY = "profit-machine-signal-quota";

export const SIGNAL_QUOTA_LIMIT = 30;
export const SIGNAL_QUOTA_WINDOW_MS = 8 * 60 * 60 * 1000;

type QuotaRecord = {
  windowStart: number;
  count: number;
};

export type SignalQuotaStatus = {
  used: number;
  limit: number;
  remaining: number;
  isBlocked: boolean;
  resetAt: number;
};

function defaultRecord(now: number): QuotaRecord {
  return { windowStart: now, count: 0 };
}

function readRecord(): QuotaRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuotaRecord;
    if (
      typeof parsed.windowStart !== "number" ||
      typeof parsed.count !== "number" ||
      !Number.isFinite(parsed.windowStart) ||
      !Number.isFinite(parsed.count)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeRecord(record: QuotaRecord): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function normalizeRecord(record: QuotaRecord, now: number): QuotaRecord {
  if (now - record.windowStart >= SIGNAL_QUOTA_WINDOW_MS) {
    return defaultRecord(now);
  }
  return record;
}

function loadRecord(now: number): QuotaRecord {
  const raw = readRecord() ?? defaultRecord(now);
  const record = normalizeRecord(raw, now);
  if (record.windowStart !== raw.windowStart || record.count !== raw.count) {
    writeRecord(record);
  }
  return record;
}

export function getSignalQuotaStatus(now = Date.now()): SignalQuotaStatus {
  const record = loadRecord(now);
  const resetAt = record.windowStart + SIGNAL_QUOTA_WINDOW_MS;
  const remaining = Math.max(0, SIGNAL_QUOTA_LIMIT - record.count);

  return {
    used: record.count,
    limit: SIGNAL_QUOTA_LIMIT,
    remaining,
    isBlocked: record.count >= SIGNAL_QUOTA_LIMIT,
    resetAt,
  };
}

export function canRequestSignal(now = Date.now()): boolean {
  return !getSignalQuotaStatus(now).isBlocked;
}

export function consumeSignalQuota(now = Date.now()): SignalQuotaStatus {
  const record = loadRecord(now);
  if (record.count >= SIGNAL_QUOTA_LIMIT) {
    return getSignalQuotaStatus(now);
  }

  const next = { ...record, count: record.count + 1 };
  writeRecord(next);

  const resetAt = next.windowStart + SIGNAL_QUOTA_WINDOW_MS;
  const remaining = Math.max(0, SIGNAL_QUOTA_LIMIT - next.count);

  return {
    used: next.count,
    limit: SIGNAL_QUOTA_LIMIT,
    remaining,
    isBlocked: next.count >= SIGNAL_QUOTA_LIMIT,
    resetAt,
  };
}

export function formatQuotaResetCountdown(
  resetAt: number,
  locale: "en" | "fr",
  now = Date.now()
): string {
  const ms = Math.max(0, resetAt - now);
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

  if (locale === "fr") {
    if (hours > 0) return `${hours} h ${minutes} min`;
    return `${minutes} min`;
  }

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
