"use client";

import { getTranslations } from "@/lib/i18n";
import { useAppStore } from "@/store/useAppStore";

export function useTranslations() {
  const locale = useAppStore((s) => s.locale);
  return getTranslations(locale);
}
