"use client";

import { useEffect, useMemo, useState } from "react";
import { ensureConnection, getClient } from "@/services/mqttService";

const zigbeeDevicesTopic = "zigbee2mqtt/bridge/devices";

type InterviewState = "PENDING" | "IN_PROGRESS" | "SUCCESSFUL" | "FAILED";

type ZigbeeDevice = {
	ieee_address?: string;
	type?: string;
	network_address?: number;
	supported?: boolean;
	disabled?: boolean;
	friendly_name?: string;
	description?: string;
	power_source?: string;
	date_code?: string;
	model_id?: string;
	interview_state?: InterviewState;
	interviewing?: boolean;
	interview_completed?: boolean;
	definition?: {
		source?: string;
		model?: string;
		vendor?: string;
		description?: string;
	};
	endpoints?: Record<
		string,
		{
			clusters?: {
				input?: string[];
				output?: string[];
				scenes?: string[];
			};
		}
	>;
};

function asDeviceArray(payload: unknown): ZigbeeDevice[] {
	if (!Array.isArray(payload)) {
		return [];
	}

	return payload.filter((entry): entry is ZigbeeDevice => Boolean(entry && typeof entry === "object"));
}

function formatAddress(address?: string) {
	if (!address) {
		return "Unknown address";
	}

	return `${address.slice(0, 10)}…${address.slice(-4)}`;
}

function formatNetworkAddress(address?: number) {
	if (address === undefined || address === null || Number.isNaN(address)) {
		return "—";
	}

	return `NWK ${address}`;
}

function deviceStateLabel(device: ZigbeeDevice) {
	if (device.disabled) {
		return { label: "Disabled", className: "border-rose-400/20 bg-rose-400/10 text-rose-200" };
	}

	if (device.interview_state === "FAILED") {
		return { label: "Interview failed", className: "border-amber-400/20 bg-amber-400/10 text-amber-200" };
	}

	if (device.interview_state === "IN_PROGRESS" || device.interviewing) {
		return { label: "Interviewing", className: "border-sky-400/20 bg-sky-400/10 text-sky-200" };
	}

	if (device.interview_state === "PENDING") {
		return { label: "Pending", className: "border-white/10 bg-white/5 text-zinc-200" };
	}

	return { label: "Online", className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" };
}

function EndpointPill({ label, value }: { label: string; value: string | number }) {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
			<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">{label}</p>
			<p className="mt-1 text-sm font-semibold text-white">{value}</p>
		</div>
	);
}

function DeviceCard({ device }: { device: ZigbeeDevice }) {
	const endpointCount = Object.keys(device.endpoints ?? {}).length;
	const state = deviceStateLabel(device);

	return (
		<article className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-white/7">
			<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),transparent_30%,rgba(16,185,129,0.08))] opacity-60 transition duration-300 group-hover:opacity-100" />
			<div className="relative flex h-full flex-col gap-5">
				<div className="flex items-start justify-between gap-4">
					<div>
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="text-lg font-semibold tracking-tight text-white">
								{device.friendly_name || device.definition?.model || "Unnamed device"}
							</h3>
							<span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${state.className}`}>
								{state.label}
							</span>
						</div>
						<p className="mt-2 text-sm leading-6 text-zinc-300">
							{device.description || device.definition?.description || "No description available."}
						</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-zinc-950/50 px-3 py-2 text-right">
						<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">Type</p>
						<p className="mt-1 text-sm font-semibold text-white">{device.type || "Unknown"}</p>
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
					<EndpointPill label="Vendor" value={device.definition?.vendor || "Unknown"} />
					<EndpointPill label="Model" value={device.definition?.model || device.model_id || "Unknown"} />
					<EndpointPill label="Endpoints" value={endpointCount} />
					<EndpointPill label="Network" value={formatNetworkAddress(device.network_address)} />
				</div>

				<div className="flex flex-wrap gap-2 text-xs font-medium">
					<span className={`inline-flex rounded-full border px-3 py-1 ${device.supported ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-amber-400/20 bg-amber-400/10 text-amber-200"}`}>
						{device.supported ? "Supported" : "Unsupported"}
					</span>
					<span className={`inline-flex rounded-full border px-3 py-1 ${device.disabled ? "border-rose-400/20 bg-rose-400/10 text-rose-200" : "border-white/10 bg-white/5 text-zinc-200"}`}>
						{device.disabled ? "Disabled" : "Enabled"}
					</span>
					<span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300">
						{device.power_source || "Power unknown"}
					</span>
				</div>

				<div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
					<div>
						<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">IEEE</p>
						<p className="mt-1 text-sm text-zinc-200">{formatAddress(device.ieee_address)}</p>
					</div>
					<div>
						<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">Date code</p>
						<p className="mt-1 text-sm text-zinc-200">{device.date_code || "Unknown"}</p>
					</div>
					<div>
						<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">Interview</p>
						<p className="mt-1 text-sm text-zinc-200">{device.interview_state || (device.interview_completed ? "SUCCESSFUL" : "PENDING")}</p>
					</div>
				</div>
			</div>
		</article>
	);
}

export default function ZigbeeDevicesComponent() {
	const [devices, setDevices] = useState<ZigbeeDevice[]>([]);
	const [lastUpdated, setLastUpdated] = useState<number | null>(null);
	const [connected, setConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		ensureConnection();
		const client = getClient();

		if (!client) {
			setError("MQTT client is not available right now.");
			return;
		}

		const handleMessage = (topic: string, message: Buffer) => {
			if (topic !== zigbeeDevicesTopic) {
				return;
			}

			try {
				const parsed = JSON.parse(message.toString()) as unknown;
				setDevices(asDeviceArray(parsed));
				setLastUpdated(Date.now());
				setConnected(true);
				setError(null);
			} catch {
				setError("Received an invalid device payload from Zigbee2MQTT.");
			}
		};

		const handleConnect = () => setConnected(true);
		const handleClose = () => setConnected(false);

		client.subscribe(zigbeeDevicesTopic, { qos: 0 }, (subscribeError) => {
			if (subscribeError) {
				setError("Could not subscribe to Zigbee2MQTT device updates.");
			}
		});
		client.on("message", handleMessage);
		client.on("connect", handleConnect);
		client.on("close", handleClose);

		setConnected(Boolean(client.connected));

		return () => {
			try {
				client.off("message", handleMessage);
				client.off("connect", handleConnect);
				client.off("close", handleClose);
				client.unsubscribe(zigbeeDevicesTopic);
			} catch {
				// Ignore cleanup errors during reconnects.
			}
		};
	}, []);

	const summary = useMemo(() => {
		const total = devices.length;
		const online = devices.filter((device) => !device.disabled).length;
		const supported = devices.filter((device) => device.supported).length;
		const routers = devices.filter((device) => device.type === "Router").length;

		return { total, online, supported, routers };
	}, [devices]);

	return (
		<section className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/75 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
			<div className="border-b border-white/10 px-6 py-5 sm:px-8">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div className="space-y-2">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Zigbee network</p>
						<h2 className="text-2xl font-semibold tracking-tight text-white">Connected devices overview</h2>
						<p className="max-w-2xl text-sm leading-6 text-zinc-400">
							Live devices from Zigbee2MQTT bridge/devices, styled for quick scanning and clean admin monitoring.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-300">
						<span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 ${connected ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-amber-400/20 bg-amber-400/10 text-amber-200"}`}>
							<span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-300" : "bg-amber-300"}`} />
							{connected ? "Live feed connected" : "Waiting for feed"}
						</span>
						<span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2">
							Last sync: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Unknown"}
						</span>
					</div>
				</div>
			</div>

			<div className="grid gap-3 border-b border-white/10 bg-white/[0.03] px-6 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
				<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Total devices</p>
					<p className="mt-2 text-3xl font-semibold text-white">{summary.total}</p>
				</div>
				<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Enabled</p>
					<p className="mt-2 text-3xl font-semibold text-white">{summary.online}</p>
				</div>
				<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Supported</p>
					<p className="mt-2 text-3xl font-semibold text-white">{summary.supported}</p>
				</div>
				<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Routers</p>
					<p className="mt-2 text-3xl font-semibold text-white">{summary.routers}</p>
				</div>
			</div>

			{error ? (
				<div className="border-b border-white/10 px-6 py-4 sm:px-8">
					<div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
						{error}
					</div>
				</div>
			) : null}

			<div className="grid gap-4 p-6 sm:p-8 xl:grid-cols-2">
				{devices.length ? (
					devices.map((device, index) => <DeviceCard key={`${device.ieee_address ?? device.friendly_name ?? index}`} device={device} />)
				) : (
					<div className="xl:col-span-2 rounded-[1.6rem] border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-sm text-zinc-400">
						No Zigbee devices have been received yet. Once Zigbee2MQTT publishes bridge/devices, they will appear here.
					</div>
				)}
			</div>
		</section>
	);
}