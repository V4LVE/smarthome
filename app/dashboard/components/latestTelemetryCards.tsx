import { Card, CardContent } from "@heroui/react";
import type { TelemetryPoint } from "./types";

type LatestTelemetryCardsProps = {
  latest: TelemetryPoint | null;
};

function StatCard({
  title,
  value,
  unit,
  accent,
}: {
  title: string;
  value: string;
  unit: string;
  accent: string;
}) {
  return (
    <Card className="border border-zinc-200/70 bg-white/80 shadow-md shadow-zinc-950/5 dark:border-zinc-800/80 dark:bg-zinc-900/65">
      <CardContent className="gap-3 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
        <div className="flex items-end gap-2">
          <span className={`text-3xl font-semibold tracking-tight ${accent}`}>
            {value}
          </span>
          <span className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function LatestTelemetryCards({ latest }: LatestTelemetryCardsProps) {
  const temperature = latest ? latest.temperature.toFixed(1) : "--";
  const humidity = latest ? latest.humidity.toFixed(1) : "--";
  const timeLabel = latest
    ? new Date(latest.timestamp).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
      })
    : "No telemetry available";

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <StatCard
        title="Latest Temperature"
        value={temperature}
        unit="°C"
        accent="text-rose-600 dark:text-rose-400"
      />
      <StatCard
        title="Latest Humidity"
        value={humidity}
        unit="%"
        accent="text-cyan-600 dark:text-cyan-400"
      />

      <p className="sm:col-span-2 px-1 text-xs text-zinc-500 dark:text-zinc-400">
        Last updated: {timeLabel}
      </p>
    </section>
  );
}
