import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({
	path: ".dev.vars"
}); // or .env.local

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql });

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: "drizzle",
		});

		console.log("Migration Successful!");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();
