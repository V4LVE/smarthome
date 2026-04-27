"use client";

import { Button } from "@heroui/react";

type IntervalType = "30m" | "1h" | "24h" | "7d" | "14d";

type IntervalSelectorProps = {
  selectedInterval: IntervalType;
  onIntervalChange: (interval: IntervalType) => void;
  isLoading: boolean;
};

const INTERVALS: { value: IntervalType; label: string }[] = [
  { value: "30m", label: "30m" },
  { value: "1h", label: "1h" },
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "14d", label: "14d" },
];

export function IntervalSelector({
  selectedInterval,
  onIntervalChange,
  isLoading,
}: IntervalSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 self-center mr-2">
        Time Range
      </span>
      {INTERVALS.map((interval) => (
        <Button
          key={interval.value}
          size="sm"
          onClick={() => onIntervalChange(interval.value)}
          className={`transition-all ${
            selectedInterval === interval.value
              ? "bg-cyan-600 text-white dark:bg-cyan-500"
              : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          }`}
          isDisabled={isLoading}
        >
          {interval.label}
        </Button>
      ))}
    </div>
  );
}
