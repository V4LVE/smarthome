import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { AdminDashboardData, AdminUser } from "./types";

const DEFAULT_LIMIT = 12;

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
	try {
		const requestHeaders = await headers();
		const [session, usersResponse] = await Promise.all([
			auth.api.getSession({ headers: requestHeaders }),
			auth.api.listUsers({
				headers: requestHeaders,
				query: {
					limit: DEFAULT_LIMIT,
					sortBy: "createdAt",
					sortDirection: "desc",
				},
			}),
		]);

		const users = (usersResponse?.users ?? []) as AdminUser[];
		const adminCount = users.filter((user) => user.role === "admin").length;
		const bannedCount = users.filter((user) => Boolean(user.banned)).length;
		const verifiedCount = users.filter((user) => Boolean(user.emailVerified)).length;

		return {
			adminUser: {
				name: session?.user?.name ?? "Administrator",
				email: session?.user?.email ?? "",
				role: session?.user?.role ?? "admin",
			},
			users,
			totalUsers: usersResponse?.total ?? users.length,
			adminCount,
			bannedCount,
			verifiedCount,
			error: null,
		};
	} catch {
		return {
			adminUser: {
				name: "Administrator",
				email: "",
				role: "admin",
			},
			users: [],
			totalUsers: 0,
			adminCount: 0,
			bannedCount: 0,
			verifiedCount: 0,
			error: "The admin dashboard could not load Better Auth users right now.",
		};
	}
}