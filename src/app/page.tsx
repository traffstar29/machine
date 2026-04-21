"use client";

import { ProcessingScreen } from "@/components/ProcessingScreen";
import { SettingsScreen } from "@/components/SettingsScreen";
import { SignalScreen } from "@/components/SignalScreen";
import { TelegramInit } from "@/components/TelegramInit";
import { useAppStore } from "@/store/useAppStore";

export default function HomePage() {
  const screen = useAppStore((s) => s.screen);

  return (
    <main className="relative mx-auto min-h-[100dvh] w-full max-w-lg overflow-x-hidden px-4 pb-2 pt-[env(safe-area-inset-top)]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(239,68,68,0.2) 0%, transparent 50%)",
        }}
      />
      <TelegramInit />
      {screen === "settings" && <SettingsScreen />}
      {screen === "processing" && <ProcessingScreen />}
      {screen === "signal" && <SignalScreen />}
    </main>
  );
}
