import { JwtPayload } from "./jwt.js";
import { ZodTypeAny } from "zod";

declare global {
    namespace Express {
        interface Request {
            validatedData?: unknown;
            user?: JwtPayload
        }
    }
}

export {};