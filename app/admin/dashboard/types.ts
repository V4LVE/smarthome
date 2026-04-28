export type AdminUser = {
	id: string;
	name: string;
	email: string;
	image?: string | null;
	role?: string | null;
	createdAt: Date | string;
	emailVerified?: boolean;
	banned?: boolean | null;
	banReason?: string | null;
	banExpires?: Date | string | null;
};

export type AdminSessionUser = {
	name: string;
	email: string;
	role?: string | null;
};

export type AdminDashboardData = {
	adminUser: AdminSessionUser;
	users: AdminUser[];
	totalUsers: number;
	adminCount: number;
	bannedCount: number;
	verifiedCount: number;
	error: string | null;
};

export type RoleActionState = {
	status: "idle" | "success" | "error";
	message: string;
};

export const roleActionInitialState: RoleActionState = {
	status: "idle",
	message: "",
};