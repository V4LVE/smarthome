import db from "@/lib/dbClient";
import { user } from "@/schemas";
import { eq } from "drizzle-orm";

(async () => {
  const emailArg = process.argv[2];
  const adminEmail = emailArg ?? process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error("Missing admin email. Usage: bun run seed:admin -- your@email.com");
    process.exit(1);
  }

  const existingUser = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.email, adminEmail),
    columns: {
      id: true,
      role: true,
    },
  });

  if (!existingUser) {
    console.error(`No user found with email: ${adminEmail}`);
    console.error("Sign up first, then run this command again.");
    process.exit(1);
  }

  if (existingUser.role === "admin") {
    console.log(`User ${adminEmail} is already admin.`);
    process.exit(0);
  }

  await db
    .update(user)
    .set({
      role: "admin",
    })
    .where(eq(user.id, existingUser.id));

  console.log(`Promoted ${adminEmail} to admin.`);
})();