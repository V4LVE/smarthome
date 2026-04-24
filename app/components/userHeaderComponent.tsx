"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Link } from "@heroui/react";
import { useRouter } from "next/navigation";

export function UserHeaderComponent() {
    const { data: session, isPending, error } = authClient.useSession();

    const router = useRouter();

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin"); // redirect to login page
                },
            },
        });
    }

    function routeToSignIn() {
        router.push("/signin");
    }

    function routeToProfile() {
        router.push("/profile");
    }

        if (isPending) {
            return <div>Loading user...</div>;
        }

        if (error || !session?.user) {
            return <Button onClick={routeToSignIn} className="rounded-full bg-zinc-900 px-4 py-2 font-medium text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                    Sign in
                </Button>
        }

        return (
            <div className="flex items-center gap-4 rounded-full bg-zinc-900 px-4 py-2 font-medium text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                <h1>Welcome {session.user.name ?? "User"}</h1>
                    <Button onClick={signOut} variant="danger-soft" className="rounded-full">
                        Sign out
                    </Button>
                    <Button onClick={routeToProfile} variant="primary" className="rounded-full">
                        Profile
                    </Button>
            </div>
        );
    }