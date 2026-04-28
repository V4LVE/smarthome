import { AdminRoleForm } from "./admin-role-form";
import type { AdminUser } from "../types";

function formatDate(value: Date | string) {
	const date = value instanceof Date ? value : new Date(value);
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

function roleStyles(role?: string | null) {
	if (role === "admin") {
		return "border-cyan-400/20 bg-cyan-400/10 text-cyan-200";
	}

	return "border-white/10 bg-white/5 text-zinc-200";
}

export function AdminUsersTable({ users }: { users: AdminUser[] }) {
	return (
		<section className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/75 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
			<div className="border-b border-white/10 px-6 py-5 sm:px-8">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">User management</p>
						<h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Better Auth users</h2>
					</div>
					<p className="text-sm text-zinc-400">Adjust roles and review the latest accounts from one screen.</p>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-white/10">
					<thead className="bg-white/5 text-left text-xs uppercase tracking-[0.18em] text-zinc-400">
						<tr>
							<th className="px-6 py-4 sm:px-8">User</th>
							<th className="px-6 py-4">Status</th>
							<th className="px-6 py-4">Role</th>
							<th className="px-6 py-4">Joined</th>
							<th className="px-6 py-4">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/8">
						{users.length ? (
							users.map((user) => (
								<tr key={user.id} className="transition hover:bg-white/4">
									<td className="px-6 py-5 sm:px-8">
										<div className="flex items-center gap-4">
											<div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-sm font-semibold text-white">
												{user.name.slice(0, 2).toUpperCase()}
											</div>
											<div>
												<p className="font-medium text-white">{user.name}</p>
												<p className="text-sm text-zinc-400">{user.email}</p>
											</div>
										</div>
									</td>
									<td className="px-6 py-5">
										<div className="flex flex-wrap gap-2">
											<span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${user.emailVerified ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-amber-400/20 bg-amber-400/10 text-amber-200"}`}>
												{user.emailVerified ? "Verified" : "Unverified"}
											</span>
											<span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${user.banned ? "border-rose-400/20 bg-rose-400/10 text-rose-200" : "border-white/10 bg-white/5 text-zinc-200"}`}>
												{user.banned ? "Banned" : "Active"}
											</span>
										</div>
									</td>
									<td className="px-6 py-5">
										<span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${roleStyles(user.role)}`}>
											{user.role || "user"}
										</span>
									</td>
									<td className="px-6 py-5 text-sm text-zinc-300">{formatDate(user.createdAt)}</td>
									<td className="px-6 py-5">
										<AdminRoleForm key={`${user.id}:${user.role ?? "user"}`} user={user} />
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="px-6 py-12 text-center sm:px-8">
									<div className="mx-auto max-w-md space-y-3">
										<p className="text-lg font-medium text-white">No users found</p>
										<p className="text-sm leading-6 text-zinc-400">
											The Better Auth admin list is currently empty. New accounts will appear here automatically.
										</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}