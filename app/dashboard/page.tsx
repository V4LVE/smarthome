import { Alert, AlertTitle } from "@heroui/react";
import { desc } from "drizzle-orm";
import db from "@/lib/dbClient";
import { telemetryTable } from "@/schemas";
import { DashboardHeader } from "./components/dashboardHeader";
import { HumidityChartCard } from "./components/humidityChartCard";
import { LatestTelemetryCards } from "./components/latestTelemetryCards";
import { TemperatureChartCard } from "./components/temperatureChartCard";
import type { TelemetryPoint } from "./components/types";

export const dynamic = "force-dynamic";

const SAMPLE_LIMIT = 72;

async function getTelemetryData(): Promise<{ data: TelemetryPoint[]; error: string | null }> {
	try {
		const telemetryRows = await db
			.select()
			.from(telemetryTable)
			.orderBy(desc(telemetryTable.timestamp))
			.limit(SAMPLE_LIMIT);

		const ordered = telemetryRows
			.reverse()
			.map((row) => ({
				id: row.id,
				temperature: row.temperature,
				humidity: row.humidity,
				timestamp: row.timestamp.toISOString(),
			}));

		return { data: ordered, error: null };
	} catch {
		return {
			data: [],
			error: "Telemetry could not be loaded right now. Please try again shortly.",
		};
	}
}

export default async function DashboardPage() {
	const { data, error } = await getTelemetryData();
	const latest = data.length ? data[data.length - 1] : null;

	return (
		<div className="relative flex-1 overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-emerald-50 px-4 py-6 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 sm:px-6 lg:px-8">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),transparent_65%)]" />

			<div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
				<DashboardHeader sampleCount={data.length} />

				{error ? (
					<Alert status="danger">
						<AlertTitle>{error}</AlertTitle>
					</Alert>
				) : null}

				<LatestTelemetryCards latest={latest} />

				<section className="grid gap-4 xl:grid-cols-2">
					<TemperatureChartCard data={data} />
					<HumidityChartCard data={data} />
				</section>
			</div>
		</div>
	);
}
