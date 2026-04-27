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
    
    trustedOrigins: ["http://localhost:3001"], // Add your trusted origins here

});