import dotenv from "dotenv";
import {z} from "zod";
import type {StringValue} from "ms"

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3000),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.url(),
    BCRYPT_ROUNDS: z.coerce.number().int().positive().min(4).max(15).default(12),
    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),
    ACCESS_TOKEN_EXPIRES_IN: z.custom<StringValue>(),
    REFRESH_TOKEN_EXPIRES_IN: z.custom<StringValue>()
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success) {
    console.error("Invalid environment variables");
    console.error(parsed.error.issues);
    process.exit(1);
}

export const env = parsed.data;