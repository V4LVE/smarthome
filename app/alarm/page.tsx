"use client";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AlarmPage() {
	const { 
        data: session, 
    } = authClient.useSession()

    const isAdmin = session?.user.role === "admin";

	if (!isAdmin) {
        return redirect("/unauthorized"); // Redirect non-admin users to unauthorized page
	}

	return (
		<section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-10">
			<div className="w-full max-w-2xl rounded-3xl border border-zinc-200/70 bg-white/85 p-8 text-center shadow-xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/75">
				<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Alarm Admin
				</h1>
				<p className="mt-3 text-zinc-600 dark:text-zinc-400">
					You are signed in with an admin role and can access this page.
				</p>
			</div>
		</section>
	);
}
