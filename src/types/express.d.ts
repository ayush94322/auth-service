import { ZodTypeAny } from "zod";

declare global {
    namespace Express {
        interface Request {
            validatedData?: unknown;
        }
    }
}

export {};