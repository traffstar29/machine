"use client";

import { create } from "zustand";
import type { AppLocale } from "@/lib/i18n";
import {
  canRequestSignal,
  consumeSignalQuota,
  getSignalQuotaStatus,
  type SignalQuotaStatus,
} from "@/lib/signalQuota";
import { getRandomSignalTargetCount, type GeneratedSignal } from "@/lib/signal";

export type Screen = "settings" | "processing" | "signal";

type AppState = {
  screen: Screen;
  signal: GeneratedSignal | null;
  syncSignalsDone: number;
  syncSignalsTarget: number;
  locale: AppLocale;
  signalQuota: SignalQuotaStatus | null;
  telegramUserId: number | null;
  /** Raw string for future backend validation */
  telegramInitData: string;
  goProcessing: () => void;
  goSignal: (s: GeneratedSignal) => void;
  goSettings: () => void;
  refreshSignalQuota: () => void;
  setLocale: (locale: AppLocale) => void;
  setTelegramUserId: (id: number | null) => void;
  setTelegramInitData: (data: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  screen: "settings",
  signal: null,
  syncSignalsDone: 0,
  syncSignalsTarget: getRandomSignalTargetCount(),
  locale: "en",
  signalQuota: null,
  telegramUserId: null,
  telegramInitData: "",

  refreshSignalQuota: () => set({ signalQuota: getSignalQuotaStatus() }),

  goProcessing: () => {
    if (!canRequestSignal()) {
      set({ signalQuota: getSignalQuotaStatus() });
      return;
    }
    set({ screen: "processing" });
  },
  goSignal: (signal) =>
    set((state) => ({
      screen: "signal",
      signal,
      syncSignalsDone: Math.min(state.syncSignalsDone + 1, state.syncSignalsTarget),
      signalQuota: consumeSignalQuota(),
    })),
  goSettings: () =>
    set({
      screen: "settings",
      signal: null,
      syncSignalsDone: 0,
      syncSignalsTarget: getRandomSignalTargetCount(),
      signalQuota: getSignalQuotaStatus(),
    }),

  setLocale: (locale) => set({ locale }),
  setTelegramUserId: (telegramUserId) => set({ telegramUserId }),
  setTelegramInitData: (telegramInitData) => set({ telegramInitData }),
}));
