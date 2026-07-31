import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JwtService } from "../services/jwt.service.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

const jwtService = new JwtService();

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const accessToken = req.cookies?.accessToken;
        if(!accessToken) {
            throw new UnauthorizedError("Authentication failed");
        }
        const payload = jwtService.verifyAccessToken(accessToken);
        req.user = payload;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return next(new UnauthorizedError("Access token expired"));
        }
        if (error instanceof JsonWebTokenError) {
            return next(new UnauthorizedError("Invalid access token"));
        }
        next(new UnauthorizedError("Invalid or expired access token"));
    }
}