"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@heroui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
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

  useEffect(() => {
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
          <LineChart data={data} margin={{ top: 12, right: 12, left: -16, bottom: 4 }}>
            <defs>
              <linearGradient id="tempStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#f97316" />
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
                border: "1px solid #e4e4e7",
                backgroundColor: "rgba(255,255,255,0.95)",
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
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="url(#tempStroke)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: "#fb7185" }}
            />
          </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-xl bg-zinc-100/70 dark:bg-zinc-800/50" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
