import { betterAuth } from "better-auth";
import db from "./dbClient";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },

    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),

    plugins: [
        admin() 
    ],
    
    trustedOrigins: process.env.TRUSTED_ORIGINS?.split(",") || ["http://localhost:3001", "http://localhost:3000", "http://127.0.0.1:3000", "http://10.131.20.59:3000"],

});