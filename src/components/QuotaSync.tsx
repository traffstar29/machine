"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

/** Keeps signal quota in store fresh (countdown + window reset). */
export function QuotaSync() {
  const refreshSignalQuota = useAppStore((s) => s.refreshSignalQuota);

  useEffect(() => {
    refreshSignalQuota();
    const id = window.setInterval(refreshSignalQuota, 1_000);
    return () => window.clearInterval(id);
  }, [refreshSignalQuota]);

  return null;
}
