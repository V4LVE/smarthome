"use client"

import { useEffect, useMemo, useState } from "react";
import { ensureConnection, getClient } from "@/services/mqttService";
import { sensorVm } from "./sensorVm";

const doorSensorTopic = "zigbee2mqtt/0xa4c138bbabc23d69";

type Status = "open" | "closed" | "unknown";

function StatusBadge({ status }: { status: Status }) {
    const { label, classes } = useMemo(() => {
        if (status === "closed") return { label: "Closed", classes: "bg-emerald-100 text-emerald-800 ring-emerald-200" };
        if (status === "open") return { label: "Open", classes: "bg-rose-100 text-rose-800 ring-rose-200" };
        return { label: "Unknown", classes: "bg-zinc-100 text-zinc-800 ring-zinc-200" };
    }, [status]);

    return (
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ${classes}`}>
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.12" />
                {status === "closed" && <path d="M7 13l3 3 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                {status === "open" && <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                {status === "unknown" && <circle cx="12" cy="8" r="1" fill="currentColor" />}
            </svg>
            <span>{label}</span>
        </div>
    );
}

export default function AlarmDoorSensorComponent() {
    const [sensor, setSensor] = useState<sensorVm | null>(null);
    const [status, setStatus] = useState<Status>("unknown");
    const [lastSeen, setLastSeen] = useState<number | null>(null);

    useEffect(() => {
        ensureConnection();
        const client = getClient();
        if (!client) return;

        const handleMessage = (topic: string, message: Buffer) => {
            if (topic !== doorSensorTopic) return;
            try {
                const payload = message ? JSON.parse(message.toString()) as sensorVm : null;
                setSensor(payload);
                setLastSeen(Date.now());
                setStatus(payload?.contact ? "closed" : "open");
            } catch (err) {
                console.error("Failed to parse door sensor message", err);
                setStatus("unknown");
            }
        };

        client.subscribe(doorSensorTopic, { qos: 0 }, (err) => {
            if (err) console.warn("subscribe error", err);
        });
        client.on("message", handleMessage);

        return () => {
            try {
                client.off("message", handleMessage);
                client.unsubscribe(doorSensorTopic);
            } catch (e) {
                // ignore cleanup errors
            }
        };
    }, []);

    return (
        <div className="w-full max-w-sm rounded-2xl border border-zinc-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Door Sensor</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Entryway — Zigbee</p>
                </div>
                <div className="flex items-center">
                    <StatusBadge status={status} />
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Battery</span>
                    <strong className="mt-1">{sensor?.battery ?? "—"}{sensor?.battery ? "%" : ""}</strong>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Link</span>
                    <strong className="mt-1">{sensor?.linkquality ?? "—"}</strong>
                </div>
                <div className="col-span-2 mt-2">
                    <span className="text-xs text-zinc-400">Last update</span>
                    <div className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{lastSeen ? new Date(lastSeen).toLocaleString() : "Unknown"}</div>
                </div>
            </div>
        </div>
    );
}