import {ZodType} from "zod";
import type { RequestHandler } from "express";
import { BadRequestError } from "../errors/BadRequestError.js";

export function validate(schema: ZodType): RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if(!result.success) {
            return next(
                new BadRequestError(
                    result.error.issues[0].message
                )
            );
        }

        req.validatedData = result.data;
        next();
    }
}