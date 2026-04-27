"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { fetchTelemetryByInterval } from "../actions";
import type { TelemetryPoint } from "./types";
import { IntervalSelector } from "./intervalSelector";
import { TemperatureChartCard } from "./temperatureChartCard";
import { HumidityChartCard } from "./humidityChartCard";
import { Alert, AlertTitle, Spinner } from "@heroui/react";

type IntervalType = "30m" | "1h" | "24h" | "7d" | "14d";

type ChartsWrapperProps = {
  initialData: TelemetryPoint[];
};

export function ChartsWrapper({ initialData }: ChartsWrapperProps) {
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>("24h");
  const [chartData, setChartData] = useState<TelemetryPoint[]>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const scrollPosRef = useRef(0);
  const wasLoadingRef = useRef(false);

  // Effect to save scroll position and fetch data when interval changes
  useEffect(() => {
    scrollPosRef.current = window.scrollY;
    wasLoadingRef.current = true;

    startTransition(async () => {
      setError(null);
      const result = await fetchTelemetryByInterval(selectedInterval);
      if (result.error) {
        setError(result.error);
        setChartData([]);
      } else {
        setChartData(result.data);
      }
    });
  }, [selectedInterval]);

  // Effect to restore scroll position when loading completes
  useEffect(() => {
    if (wasLoadingRef.current && !isPending) {
      wasLoadingRef.current = false;
      window.scrollTo(0, scrollPosRef.current);
    }
  }, [isPending]);

  const handleIntervalChange = (interval: IntervalType) => {
    setSelectedInterval(interval);
  };

  return (
    <section className="space-y-4">
      <IntervalSelector
        selectedInterval={selectedInterval}
        onIntervalChange={handleIntervalChange}
        isLoading={isPending}
      />

      {isPending && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/65">
          <Spinner size="sm" color="current" />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Loading telemetry...
          </span>
        </div>
      )}

      {error && !isPending && (
        <Alert status="danger">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      {!isPending && !error && chartData.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-zinc-200/70 bg-white/80 p-12 dark:border-zinc-800/80 dark:bg-zinc-900/65">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No data available for this time range
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Try selecting a different interval
          </p>
        </div>
      )}

      {!isPending && !error && chartData.length > 0 && (
        <div className="grid gap-4 xl:grid-cols-2">
          <TemperatureChartCard data={chartData} />
          <HumidityChartCard data={chartData} />
        </div>
      )}
    </section>
  );
}
