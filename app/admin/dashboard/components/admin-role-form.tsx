"use client";

import { useActionState } from "react";
import { updateUserRole } from "../actions";
import type { AdminUser } from "../types";
import { roleActionInitialState } from "../types";

const availableRoles = ["user", "admin"] as const;

function RoleStatusPill({ status }: { status: "idle" | "success" | "error" }) {
	if (status === "success") {
		return <span className="text-xs font-medium text-emerald-300">Saved</span>;
	}

	if (status === "error") {
		return <span className="text-xs font-medium text-rose-300">Action failed</span>;
	}

	return <span className="text-xs font-medium text-zinc-500">Ready</span>;
}

export function AdminRoleForm({ user }: { user: AdminUser }) {
	const [state, formAction, isPending] = useActionState(updateUserRole, roleActionInitialState);
	const currentRole = user.role || "user";

	return (
		<form action={formAction} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 md:flex-row md:items-center md:justify-end">
			<input type="hidden" name="userId" value={user.id} />
			<label className="sr-only" htmlFor={`role-${user.id}`}>
				Role for {user.email}
			</label>
			<select
				id={`role-${user.id}`}
				name="role"
				defaultValue={currentRole}
				className="min-w-32 rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/50"
			>
				{availableRoles.map((role) => (
					<option key={role} value={role}>
						{role}
					</option>
				))}
			</select>

			<button
				type="submit"
				disabled={isPending}
				className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
			>
				{isPending ? "Saving..." : "Save role"}
			</button>

			<div className="md:ml-2 md:min-w-28">
				<RoleStatusPill status={state.status} />
			</div>

			{state.message ? (
				<p className={`text-sm md:ml-2 ${state.status === "error" ? "text-rose-300" : "text-emerald-300"}`}>
					{state.message}
				</p>
			) : null}
		</form>
	);
}