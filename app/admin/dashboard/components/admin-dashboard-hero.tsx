import Link from "next/link";
import type { AdminDashboardData } from "../types";

function formatRoleLabel(role?: string | null) {
	if (!role) {
		return "Unknown role";
	}

	return role.charAt(0).toUpperCase() + role.slice(1);
}

export function AdminDashboardHero({
	adminUser,
	totalUsers,
	adminCount,
	bannedCount,
	verifiedCount,
}: Pick<AdminDashboardData, "adminUser" | "totalUsers" | "adminCount" | "bannedCount" | "verifiedCount">) {
	return (
		<section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%)]" />
			<div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
						Admin console
					</div>

					<div className="space-y-4">
						<h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
							Manage Better Auth users and roles from a focused, modern control room.
						</h1>
						<p className="max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
							Review access, promote or demote users, and keep the authentication layer tidy
							without leaving the dashboard.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Link
							href="/dashboard"
							className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-cyan-400/30 hover:bg-white/10"
						>
							Open user dashboard
						</Link>
						<div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-300">
							<span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
							Signed in as {adminUser.name} · {formatRoleLabel(adminUser.role)}
						</div>
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
					<div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
						<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Total users</p>
						<p className="mt-3 text-3xl font-semibold text-white">{totalUsers}</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
						<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Admins</p>
						<p className="mt-3 text-3xl font-semibold text-white">{adminCount}</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
						<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Verified</p>
						<p className="mt-3 text-3xl font-semibold text-white">{verifiedCount}</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
						<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Banned</p>
						<p className="mt-3 text-3xl font-semibold text-white">{bannedCount}</p>
					</div>
				</div>
			</div>
		</section>
	);
}