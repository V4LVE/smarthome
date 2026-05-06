"use client"

import { useEffect, useMemo, useState } from "react";
import { ensureConnection, getClient } from "@/services/mqttService";
import { tempSensorVm } from "../models/tempSensorVm";

const tempSensorTopic = "zigbee2mqtt/0xa4c1386525a0a233";

function formatValue(value: number | null | undefined, suffix: string) {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return "Unknown";
    }

    return `${value}${suffix}`;
}

function MetricCard({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent: string;
}) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${accent} p-4 shadow-sm`}>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
    );
}

export default function TempSensorComponent() {
    const [sensor, setSensor] = useState<tempSensorVm | null>(null);
    const [lastSeen, setLastSeen] = useState<number | null>(null);

    useEffect(() => {
        ensureConnection();
        const client = getClient();
        if (!client) return;

        const handleMessage = (topic: string, message: Buffer) => {
            if (topic !== tempSensorTopic) return;

            try {
                const payload = message ? (JSON.parse(message.toString()) as tempSensorVm) : null;
                setSensor(payload);
                setLastSeen(Date.now());
            } catch (error) {
                console.error("Failed to parse temperature sensor message", error);
                setSensor(null);
            }
        };

        client.subscribe(tempSensorTopic, { qos: 0 }, (err) => {
            if (err) console.warn("subscribe error", err);
        });
        client.on("message", handleMessage);

        return () => {
            try {
                client.off("message", handleMessage);
                client.unsubscribe(tempSensorTopic);
            } catch {
                // Ignore cleanup errors during reconnects.
            }
        };
    }, []);

    const temperature = useMemo(() => formatValue(sensor?.temperature, "°C"), [sensor?.temperature]);
    const humidity = useMemo(() => formatValue(sensor?.humidity, "%"), [sensor?.humidity]);
    const linkquality = useMemo(() => formatValue(sensor?.linkquality, ""), [sensor?.linkquality]);
    const battery = useMemo(() => formatValue(sensor?.battery, "%"), [sensor?.battery]);

    return (
        <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/85 shadow-2xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/75">
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500" />

            <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                            Climate sensor
                        </p>
                        <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Temperature & Humidity
                        </h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Live values from the MQTT sensor feed.
                        </p>
                    </div>

                    <div className="rounded-full border border-zinc-200/70 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                        Last update: {lastSeen ? new Date(lastSeen).toLocaleTimeString() : "Unknown"}
                    </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <MetricCard
                        label="Temperature"
                        value={temperature}
                        accent="from-cyan-500 to-sky-600"
                    />
                    <MetricCard
                        label="Humidity"
                        value={humidity}
                        accent="from-emerald-500 to-teal-600"
                    />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Battery</p>
                        <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{battery}</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Link quality</p>
                        <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{linkquality}</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Status</p>
                        <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {sensor ? "Online" : "Unknown"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}