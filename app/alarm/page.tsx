"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { redirect } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { alertManager } from "@/lib/alert-manager";
import { toggleAlarm } from "@/services/alarmService";

const DEFAULT_ALARM_PIN = "1234";

export default function AlarmPage() {
	const { data: session, isPending } = authClient.useSession();
	const [isArmed, setIsArmed] = useState(false);
	const [pinCode, setPinCode] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUnauthorized, setIsUnauthorized] = useState(false);
	const hasShownAlert = useRef(false);

	const isAdmin = session?.user.role === "admin";
	const currentPin = useMemo(
		() => process.env.NEXT_PUBLIC_ALARM_PIN?.trim() || DEFAULT_ALARM_PIN,
		[],
	);
	const primaryActionLabel = isArmed ? "Disarm alarm" : "Arm alarm";
	const pinHasValidLength = pinCode.length >= 4;

	useEffect(() => {
		if (!isPending && !isAdmin && !hasShownAlert.current) {
			const handleUnauthorized = async () => {
				hasShownAlert.current = true;
				await alertManager.showError(
					"Access denied",
					"You do not have permission to access the alarm control center.",
				);
				setIsUnauthorized(true);
			};
			handleUnauthorized();
		}
	}, [isAdmin, isPending]);

	if (isUnauthorized) {
		return redirect("/unauthorized");
	}

	if (isPending) {
		return (
			<section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-10">
				<div className="w-full max-w-3xl animate-pulse rounded-3xl border border-zinc-200/70 bg-white/85 p-8 shadow-xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/75 sm:p-10">
					<div className="h-8 w-56 rounded bg-zinc-200 dark:bg-zinc-800" />
					<div className="mt-4 h-5 w-80 rounded bg-zinc-200 dark:bg-zinc-800" />
					<div className="mt-8 h-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
					<div className="mt-6 h-32 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</section>
		);
	}



	const handleToggleAlarm = async () => {
		if (!pinHasValidLength) {
			await alertManager.showWarning(
				"PIN required",
				"Enter a valid PIN code before changing alarm state.",
			);
			return;
		}

		if (pinCode !== currentPin) {
			await alertManager.showError(
				"Invalid PIN",
				"The entered PIN code is incorrect. Please try again.",
			);
			setPinCode("");
			return;
		}

		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 350));
		setIsArmed((previous) => !previous);
		await toggleAlarm(!isArmed);
		setPinCode("");
		setIsSubmitting(false);

		await alertManager.showSuccess(
			isArmed ? "Alarm disarmed" : "Alarm armed",
			isArmed
				? "The security alarm is now disarmed."
				: "The security alarm is now armed and active.",
		);
	};

	return (
		<section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900" />
			<div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
			<div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

			<div className="relative w-full max-w-3xl rounded-3xl border border-zinc-200/70 bg-white/85 p-8 shadow-2xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/75 sm:p-10">
				<div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

				<header>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
						Security control
					</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
						Alarm Control Center
					</h1>
					<p className="mt-3 text-zinc-600 dark:text-zinc-400">
						Use your admin PIN to arm or disarm the home alarm system.
					</p>
				</header>

				<div className="mt-8 grid gap-4 sm:grid-cols-2">
					<div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
						<p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Current status</p>
						<div className="mt-3 flex items-center gap-3">
							<span
								className={`h-3 w-3 rounded-full ${
									isArmed
										? "bg-rose-500 shadow-md"
										: "bg-emerald-500 shadow-md"
								}`}
							/>
							<p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
								{isArmed ? "Armed" : "Disarmed"}
							</p>
						</div>
					</div>

					<div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
						<p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Access level</p>
						<p className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Administrator</p>
						<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{session?.user.email}</p>
					</div>
				</div>

				<div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
					<label
						htmlFor="alarm-pin"
						className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
					>
						Security PIN
					</label>
					<input
						id="alarm-pin"
						type="password"
						inputMode="numeric"
						pattern="[0-9]*"
						autoComplete="one-time-code"
						placeholder="Enter PIN"
						value={pinCode}
						onChange={(event) => setPinCode(event.target.value.replace(/\D/g, "").slice(0, 8))}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								void handleToggleAlarm();
							}
						}}
						className="mt-3 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none ring-0 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
					/>
					<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
						Enter your admin PIN to confirm this action.
					</p>

					<Button
						onPress={() => void handleToggleAlarm()}
						isDisabled={isSubmitting || !pinCode}
						className={`mt-5 w-full rounded-xl px-6 py-6 text-base font-semibold text-white transition ${
							isArmed
								? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
								: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
						}`}
					>
						{isSubmitting ? "Applying..." : primaryActionLabel}
					</Button>
				</div>
			</div>
		</section>
	);
}
