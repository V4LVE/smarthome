import { redirect } from "next/navigation";
import { requireRole } from "@/services/requireRole";

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const canAccessAdminArea = await requireRole("admin");

	if (!canAccessAdminArea) {
		redirect("/unauthorized");
	}

	return children;
}