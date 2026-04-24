"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const { data: session, isPending, error } = authClient.useSession();
	const router = useRouter();

	if (isPending) {
		return (
			<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4 py-10 dark:bg-black">
				<div className="w-full max-w-2xl rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70">
					<div className="animate-pulse space-y-6">
						<div className="h-20 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
						<div className="h-7 w-56 rounded bg-zinc-200 dark:bg-zinc-800" />
						<div className="h-5 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
						<div className="h-24 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
					</div>
				</div>
			</div>
		);
	}

	if (error || !session?.user) {
		return (
			<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4 py-10 dark:bg-black">
				<div className="w-full max-w-xl rounded-3xl border border-zinc-200/70 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70">
					<h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						You are not signed in
					</h1>
					<p className="mt-3 text-zinc-600 dark:text-zinc-400">
						Sign in to view your profile details.
					</p>
					<Button
						onClick={() => router.push("/signin")}
						className="mt-6 rounded-full bg-zinc-900 px-6 py-2 font-semibold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
					>
						Go to sign in
					</Button>
				</div>
			</div>
		);
	}

	const { name, email, image } = session.user;
	const initials = (name ?? "User")
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-zinc-50 px-4 py-10 dark:bg-black">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_45%)]" />

			<section className="relative w-full max-w-2xl rounded-3xl border border-zinc-200/70 bg-white/85 p-8 shadow-2xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/75 sm:p-10">
				<div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

				<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
					{image ? (
						<img
							src={image}
							alt={`${name ?? "User"} avatar`}
							className="h-24 w-24 rounded-2xl border border-zinc-200 object-cover shadow-md dark:border-zinc-700"
						/>
					) : (
						<div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-md">
							{initials}
						</div>
					)}

					<div className="flex-1 text-center sm:text-left">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
							Account profile
						</p>
						<h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
							{name ?? "User"}
						</h1>
						<p className="mt-1 text-zinc-600 dark:text-zinc-400">{email}</p>
					</div>
				</div>

				<div className="mt-8 grid gap-4 sm:grid-cols-2">
					<div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
						<p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
							Username
						</p>
						<p className="mt-2 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
							{name ?? "Not set"}
						</p>
					</div>

					<div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
						<p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
							Email
						</p>
						<p className="mt-2 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
							{email ?? "Not set"}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
