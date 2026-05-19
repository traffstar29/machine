"use client";

import { useEffect } from "react";
import { resolveLocale } from "@/lib/i18n";
import {
  getTelegramInitData,
  getTelegramUser,
  initTelegramWebApp,
} from "@/lib/telegram";
import { useAppStore } from "@/store/useAppStore";

/** initData available for future backend via store or window */
export function TelegramInit() {
  const setTelegramUserId = useAppStore((s) => s.setTelegramUserId);
  const setTelegramInitData = useAppStore((s) => s.setTelegramInitData);
  const setLocale = useAppStore((s) => s.setLocale);
  const refreshSignalQuota = useAppStore((s) => s.refreshSignalQuota);
  const locale = useAppStore((s) => s.locale);

  useEffect(() => {
    refreshSignalQuota();
    initTelegramWebApp();
    const user = getTelegramUser();
    if (user?.id != null) setTelegramUserId(user.id);
    setTelegramInitData(getTelegramInitData());
    setLocale(resolveLocale(user?.language_code));
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.debug("[telegram] initData length:", getTelegramInitData().length);
    }
  }, [refreshSignalQuota, setTelegramInitData, setTelegramUserId, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
