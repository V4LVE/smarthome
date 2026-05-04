"use client";

import { useActionState } from "react";
import { Alert, AlertTitle, Card, CardContent, CardHeader, Chip } from "@heroui/react";
import {
  toggleAllCurtainsAction,
  toggleCurtainAction,
  type CurtainCommandState,
} from "../actions";
import { curtainScenes, type CurtainDevice } from "../curtain-data";

const initialCommandState: CurtainCommandState = {
  status: "idle",
  message: "",
};

function CurtainScenePanel() {
  const [state, formAction, isPending] = useActionState(toggleAllCurtainsAction, initialCommandState);

  return (
    <Card className="overflow-hidden border border-white/70 bg-white/80 shadow-[0_24px_80px_-32px_rgba(14,165,233,0.45)] backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70">
      <CardHeader className="flex flex-col items-start gap-4 border-b border-zinc-200/70 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 dark:border-zinc-800/70 dark:from-sky-950/40 dark:via-zinc-950 dark:to-cyan-950/20">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400 shadow-lg shadow-sky-500/30" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80 dark:text-sky-300/80">
              Global scene control
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-white">
              Command every curtain at once.
            </h2>
          </div>
        </div>

        <Chip color="success" variant="soft" size="sm">
          MQTT ready
        </Chip>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        <p className="max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Use one clean action to open the whole home to daylight or close it down for privacy.
        </p>

        <form action={formAction} className="grid gap-3 sm:grid-cols-2">
          {curtainScenes.map((scene) => (
            <button
              key={scene.id}
              type="submit"
              name="desiredState"
              value={scene.desiredState}
              disabled={isPending}
              className={`group rounded-2xl border px-4 py-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60 ${
                scene.desiredState === "open"
                  ? "border-sky-200/80 bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 dark:border-sky-500/30"
                  : "border-zinc-200/80 bg-white text-zinc-900 shadow-sm hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-50 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{scene.label}</span>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    scene.desiredState === "open" ? "bg-white/90" : "bg-sky-500"
                  }`}
                />
              </div>
              <p
                className={`mt-2 text-sm leading-6 ${
                  scene.desiredState === "open" ? "text-sky-50/90" : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {scene.description}
              </p>
            </button>
          ))}
        </form>

        {state.message ? (
          <Alert
            status={state.status === "error" ? "danger" : "success"}
            className="border border-zinc-200/70 bg-zinc-50/90 dark:border-zinc-800/70 dark:bg-zinc-900/80"
          >
            <AlertTitle>{state.message}</AlertTitle>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}

function CurtainCard({ curtain }: { curtain: CurtainDevice }) {
  const [state, formAction, isPending] = useActionState(toggleCurtainAction, initialCommandState);

  return (
    <Card className="group h-full overflow-hidden border border-white/70 bg-white/80 shadow-[0_20px_70px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-36px_rgba(14,165,233,0.45)] dark:border-zinc-800/70 dark:bg-zinc-950/75">
      <CardHeader className="flex flex-col items-start gap-4 border-b border-zinc-200/70 bg-gradient-to-br from-white via-white to-zinc-50/80 p-6 dark:border-zinc-800/70 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900/80">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${curtain.accent} shadow-lg shadow-sky-500/20`} />
            <div>
              <h3 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">
                {curtain.label}
              </h3>
            </div>
          </div>

          <Chip color="success" variant="soft" size="sm">
            Ready
          </Chip>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{curtain.description}</p>

        {(curtain.latestMeasuredTemperature !== undefined ||
          curtain.latestMeasuredHumidity !== undefined) && (
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-zinc-200/50 bg-gradient-to-br from-zinc-50/50 via-white/30 to-zinc-50/50 p-4 dark:border-zinc-800/50 dark:from-zinc-900/30 dark:via-zinc-950/20 dark:to-zinc-900/30">
            {curtain.latestMeasuredTemperature !== undefined && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Temperature
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {curtain.latestMeasuredTemperature}
                  </span>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">°C</span>
                </div>
              </div>
            )}
            {curtain.latestMeasuredHumidity !== undefined && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Humidity
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {curtain.latestMeasuredHumidity}
                  </span>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">%</span>
                </div>
              </div>
            )}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="curtainId" value={curtain.id} />

          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              name="desiredState"
              value="open"
              disabled={isPending}
              className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Open
            </button>
            <button
              type="submit"
              name="desiredState"
              value="close"
              disabled={isPending}
              className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 text-sm font-semibold text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Close
            </button>
          </div>
        </form>

        {state.message ? (
          <Alert
            status={state.status === "error" ? "danger" : "success"}
            className="border border-zinc-200/70 bg-zinc-50/90 dark:border-zinc-800/70 dark:bg-zinc-900/80"
          >
            <AlertTitle>{state.message}</AlertTitle>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function CurtainControlBoard({ curtains }: { curtains: CurtainDevice[] }) {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <CurtainScenePanel />

        <Card className="overflow-hidden border border-zinc-200/70 bg-zinc-950 text-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.9)] dark:border-zinc-800/70">
          <CardHeader className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.22),transparent_55%)] p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/80">
                Command path
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">From tap to MQTT in one move.</h2>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 p-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm leading-6 text-zinc-300">
                Each control publishes a simple OPEN or CLOSED message through the curtain service,
                so the interface stays fast while the backend handles the device transport.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-200/70">1. Select</p>
                  <p className="mt-2 text-sm text-zinc-100">Choose a room or global scene.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-200/70">2. Publish</p>
                  <p className="mt-2 text-sm text-zinc-100">The server action calls curtainService.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-200/70">3. Sync</p>
                  <p className="mt-2 text-sm text-zinc-100">MQTT delivers the command instantly.</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
                <Chip color="default" variant="soft" size="sm">
                  {curtains.length} zones connected
                </Chip>
                <Chip color="accent" variant="soft" size="sm">
                  Topic format: curtains/&#123;id&#125;
                </Chip>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {curtains.map((curtain) => (
          <CurtainCard key={curtain.id} curtain={curtain} />
        ))}
      </div>
    </section>
  );
}