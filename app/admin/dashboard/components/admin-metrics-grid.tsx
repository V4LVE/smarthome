type AdminMetricsGridProps = {
	totalUsers: number;
	adminCount: number;
	bannedCount: number;
	verifiedCount: number;
};

function percentage(value: number, total: number) {
	if (!total) {
		return 0;
	}

	return Math.round((value / total) * 100);
}

export function AdminMetricsGrid({ totalUsers, adminCount, bannedCount, verifiedCount }: AdminMetricsGridProps) {
	const activeUsers = Math.max(totalUsers - bannedCount, 0);
	const adminShare = percentage(adminCount, totalUsers);
	const verifiedShare = percentage(verifiedCount, totalUsers);

	const metrics = [
		{
			label: "Active users",
			value: activeUsers,
			caption: `${activeUsers} accounts can currently sign in and use the app.`,
			accentClassName: "from-cyan-400/30 to-cyan-400/5",
		},
		{
			label: "Admin share",
			value: adminShare,
			caption: `${adminShare}% of the current user base has admin access.`,
			accentClassName: "from-emerald-400/30 to-emerald-400/5",
		},
		{
			label: "Verified accounts",
			value: verifiedShare,
			caption: `${verifiedShare}% of users have verified their email address.`,
			accentClassName: "from-sky-400/30 to-sky-400/5",
		},
	];

	return (
		<section className="grid gap-4 md:grid-cols-3">
			{metrics.map((metric) => (
				<article
					key={metric.label}
					className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur-xl"
				>
					<div className={`absolute inset-0 bg-gradient-to-br ${metric.accentClassName}`} />
					<div className="relative space-y-3">
						<div className="flex items-center justify-between gap-4">
							<p className="text-sm font-medium text-zinc-300">{metric.label}</p>
							<p className="text-3xl font-semibold text-white">{metric.value}</p>
						</div>
						<p className="max-w-md text-sm leading-6 text-zinc-400">{metric.caption}</p>
					</div>
				</article>
			))}
		</section>
	);
}