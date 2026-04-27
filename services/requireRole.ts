import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

type RoleInput = string | string[];

/**
 * Checks whether the current signed-in user has at least one of the given roles.
 * Returns `false` when the user is not signed in or does not match.
 */
export async function requireRole(requiredRole: RoleInput): Promise<boolean> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.role) {
		return false;
	}

	const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
	return allowedRoles.includes(session.user.role);
}
