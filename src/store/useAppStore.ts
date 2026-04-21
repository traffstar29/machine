"use client";

import { create } from "zustand";
import { getRandomSignalTargetCount, type GeneratedSignal } from "@/lib/signal";

export type Screen = "settings" | "processing" | "signal";

type AppState = {
  screen: Screen;
  signal: GeneratedSignal | null;
  syncSignalsDone: number;
  syncSignalsTarget: number;
  telegramUserId: number | null;
  /** Raw string for future backend validation */
  telegramInitData: string;
  goProcessing: () => void;
  goSignal: (s: GeneratedSignal) => void;
  goSettings: () => void;
  setTelegramUserId: (id: number | null) => void;
  setTelegramInitData: (data: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  screen: "settings",
  signal: null,
  syncSignalsDone: 0,
  syncSignalsTarget: getRandomSignalTargetCount(),
  telegramUserId: null,
  telegramInitData: "",

  goProcessing: () =>
    set({
      screen: "processing",
    }),
  goSignal: (signal) =>
    set((state) => ({
      screen: "signal",
      signal,
      syncSignalsDone: Math.min(state.syncSignalsDone + 1, state.syncSignalsTarget),
    })),
  goSettings: () =>
    set({
      screen: "settings",
      signal: null,
      syncSignalsDone: 0,
      syncSignalsTarget: getRandomSignalTargetCount(),
    }),

  setTelegramUserId: (telegramUserId) => set({ telegramUserId }),
  setTelegramInitData: (telegramInitData) => set({ telegramInitData }),
}));
