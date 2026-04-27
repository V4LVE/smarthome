"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@heroui/react";
import {
    Area,
    AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TelemetryPoint } from "./types";

type TemperatureChartCardProps = {
  data: TelemetryPoint[];
};

export function TemperatureChartCard({ data }: TemperatureChartCardProps) {
  const [canRenderChart, setCanRenderChart] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    const animationFrame = requestAnimationFrame(() => {
      setCanRenderChart(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <Card className="h-full border border-zinc-200/70 bg-white/80 shadow-md shadow-zinc-950/5 dark:border-zinc-800/80 dark:bg-zinc-900/65">
      <CardHeader className="pb-0">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Temperature Trend
          </p>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Temperature over Time
          </h2>
        </div>
      </CardHeader>
      <CardContent className="h-80 min-w-0 pt-4">
        <div className="h-full w-full min-w-0">
          {canRenderChart ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280}>
          <AreaChart data={data} margin={{ top: 12, right: 12, left: -16, bottom: 4 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#a1a1aa33" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value: string) =>
                new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              tick={{ fill: "#71717a", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              unit="°C"
              width={44}
            />
            <Tooltip
              cursor={{ stroke: "#fb7185", strokeDasharray: "4 4" }}
              contentStyle={{
                borderRadius: "12px",
                border: isDarkMode ? "1px solid #27272a" : "1px solid #e4e4e7",
                backgroundColor: isDarkMode ? "rgba(24, 24, 27, 0.95)" : "rgba(255,255,255,0.95)",
                color: "#fb7185",
              }}
              labelFormatter={(label) =>
                new Date(String(label)).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })
              }
              formatter={(value) => {
                const numericValue = Number(value);
                const displayValue = Number.isFinite(numericValue)
                  ? `${numericValue.toFixed(1)} °C`
                  : "-- °C";
                return [displayValue, "Temperature"];
              }}
            />
            <Area
                          type="monotone"
                          dataKey="temperature"
                          stroke="#fb7185"
                          fill="url(#tempFill)"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 5, strokeWidth: 0, fill: "#fb7185" }}
                        />
          </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-xl bg-zinc-100/70 dark:bg-zinc-800/50" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
