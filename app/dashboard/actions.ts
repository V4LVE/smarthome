"use server";

import { desc, gte } from "drizzle-orm";
import db from "@/lib/dbClient";
import { telemetryTable } from "@/schemas";
import type { TelemetryPoint } from "./components/types";

type IntervalType = "30m" | "1h" | "24h" | "7d" | "14d";

function getIntervalMinutesAndLabel(interval: IntervalType): {
  minutes: number;
  label: string;
} {
  const intervals: Record<IntervalType, { minutes: number; label: string }> = {
    "30m": { minutes: 30, label: "Last 30 Minutes" },
    "1h": { minutes: 60, label: "Last Hour" },
    "24h": { minutes: 1440, label: "Last 24 Hours" },
    "7d": { minutes: 10080, label: "Last 7 Days" },
    "14d": { minutes: 20160, label: "Last 14 Days" },
  };
  return intervals[interval];
}

export async function fetchTelemetryByInterval(
  interval: IntervalType
): Promise<{ data: TelemetryPoint[]; error: string | null; label: string }> {
  try {
    const { minutes, label } = getIntervalMinutesAndLabel(interval);
    const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);

    const telemetryRows = await db
      .select()
      .from(telemetryTable)
      .where(gte(telemetryTable.timestamp, cutoffTime))
      .orderBy(desc(telemetryTable.timestamp));

    const ordered = telemetryRows
      .reverse()
      .map((row) => ({
        id: row.id,
        temperature: row.temperature,
        humidity: row.humidity,
        timestamp: row.timestamp.toISOString(),
      }));

    return { data: ordered, error: null, label };
  } catch {
    return {
      data: [],
      error: "Failed to load telemetry for this interval.",
      label: "",
    };
  }
}
