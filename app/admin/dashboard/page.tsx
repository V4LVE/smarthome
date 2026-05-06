import { Alert, AlertTitle } from "@heroui/react";
import { AdminDashboardHero } from "./components/admin-dashboard-hero";
import { AdminMetricsGrid } from "./components/admin-metrics-grid";
import ZigbeeDevicesComponent from "./components/zigbeeDevicesComponent";
import { AdminUsersTable } from "./components/admin-users-table";
import { getAdminDashboardData } from "./data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
	const dashboard = await getAdminDashboardData();

	return (
		<div className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_30%),linear-gradient(180deg,rgba(9,9,11,1),rgba(10,10,12,1))] px-4 py-6 text-white sm:px-6 lg:px-8">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
			<div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
				<AdminDashboardHero
					adminUser={dashboard.adminUser}
					totalUsers={dashboard.totalUsers}
					adminCount={dashboard.adminCount}
					bannedCount={dashboard.bannedCount}
					verifiedCount={dashboard.verifiedCount}
				/>

				<AdminMetricsGrid
					totalUsers={dashboard.totalUsers}
					adminCount={dashboard.adminCount}
					bannedCount={dashboard.bannedCount}
					verifiedCount={dashboard.verifiedCount}
				/>

				

				{dashboard.error ? (
					<Alert status="danger">
						<AlertTitle>{dashboard.error}</AlertTitle>
					</Alert>
				) : null}

				<AdminUsersTable users={dashboard.users} />

				<ZigbeeDevicesComponent />
			</div>
		</div>
	);
}
