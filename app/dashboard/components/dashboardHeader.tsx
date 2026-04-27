import { Chip } from "@heroui/react";

type DashboardHeaderProps = {
  sampleCount: number;
};

export function DashboardHeader({ sampleCount }: DashboardHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/85 p-6 shadow-lg shadow-zinc-950/5 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/70 sm:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            SmartHome Telemetry
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Climate Dashboard
          </h1>
        </div>

        <Chip
          color="accent"
          variant="soft"
          className="border border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
        >
          {sampleCount} samples loaded
        </Chip>
      </div>
    </section>
  );
}
