import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

const baseURL =
    typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BETTER_AUTH_URL

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    ...(baseURL ? { baseURL } : {}),
    plugins: [
        adminClient()  
    ]
})