import { Card, CardContent, CardHeader, Chip } from "@heroui/react";
import { CurtainControlBoard } from "./components/curtain-control-board";
import { curtainDevices, curtainScenes } from "./curtain-data";

export default function CurtainsPage() {
	return (
		<div className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),transparent_34%),linear-gradient(180deg,#f8fcff_0%,#eefbf6_48%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),transparent_34%),linear-gradient(180deg,#09090b_0%,#111827_50%,#09090b_100%)]">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_60%)]" />
			<div className="pointer-events-none absolute -left-16 top-40 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
			<div className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

			<div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
				<CurtainControlBoard curtains={curtainDevices} />
			</div>
		</div>
	);
}
