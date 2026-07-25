import dotenv from "dotenv";
import {z} from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3000),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development")
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success) {
    console.error("Invalid environment variables");
    console.error(parsed.error.issues);
    process.exit(1);
}

export const env = parsed.data;