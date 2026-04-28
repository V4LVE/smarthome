"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { RoleActionState } from "./types";

export async function updateUserRole(
	_previousState: RoleActionState,
	formData: FormData,
): Promise<RoleActionState> {
	const userId = String(formData.get("userId") ?? "").trim();
	const role = String(formData.get("role") ?? "").trim();

	if (!userId || !role) {
		return {
			status: "error",
			message: "Choose a user and role before saving.",
		};
	}

	if (role !== "user" && role !== "admin") {
		return {
			status: "error",
			message: "Invalid role. Role must be 'user' or 'admin'.",
		};
	}

	try {
		await auth.api.setRole({
			headers: await headers(),
			body: {
				userId,
				role,
			},
		});

		revalidatePath("/admin/dashboard");

		return {
			status: "success",
			message: "Role updated successfully.",
		};
	} catch (error) {
		return {
			status: "error",
			message: error instanceof Error ? error.message : "Failed to update the role.",
		};
	}
}
