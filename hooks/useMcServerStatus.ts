"use client";

import { useEffect, useState } from "react";
import {
  EMPTY_MC_SERVER_STATUS,
  type McServerStatusPayload,
} from "@/lib/mc-server-status";

const POLL_MS = 60_000;

export function useMcServerStatus(): McServerStatusPayload & { loaded: boolean } {
  const [status, setStatus] = useState<McServerStatusPayload>(
    EMPTY_MC_SERVER_STATUS
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/mc/status");
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as McServerStatusPayload;
        if (!cancelled) {
          setStatus(data);
          setLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    }

    load();
    const interval = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return { ...status, loaded };
}
