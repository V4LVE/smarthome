import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 sm:px-6">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-28 top-12 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
				<div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_45%)]" />
			</div>

			<div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-zinc-900/70 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-300/30 bg-rose-400/15 text-rose-200">
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="h-8 w-8"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M6.2 19h11.6c1.48 0 2.4-1.6 1.66-2.88L13.66 5.8c-.74-1.28-2.58-1.28-3.32 0L4.54 16.12C3.8 17.4 4.72 19 6.2 19Z" />
					</svg>
				</div>

				<p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-300">Access Restricted</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Unauthorized</h1>
				<p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-300 sm:text-base">
					You don’t have permission to view this page. Sign in with an account that has the required access level, or return to the dashboard.
				</p>

				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Link
						href="/signin"
						className="inline-flex items-center justify-center rounded-xl bg-rose-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-rose-300"
					>
						Sign In
					</Link>
					<Link
						href="/"
						className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
					>
						Back to Dashboard
					</Link>
				</div>
			</div>
		</section>
	);
}
