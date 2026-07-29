import jwt from "jsonwebtoken";
import {env} from "../config/env.js";
import type { JwtPayload } from "../types/jwt.js";

export class JwtService {
    generateAccessToken(
        payload: JwtPayload
    ): string {
        return jwt.sign(
            payload,
            env.JWT_ACCESS_SECRET,
            {
                expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
            }
        );
    }

    generateRefreshToken(
        payload: JwtPayload
    ): string {
        return jwt.sign(
            payload,
            env.JWT_REFRESH_SECRET,
            {
                expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
            }
        );
    }

    verifyAccessToken(
        token: string
    ): JwtPayload {
        return jwt.verify(
            token,
            env.JWT_ACCESS_SECRET
        ) as JwtPayload;
    }

    verifyRefreshToken(
        token: string
    ): JwtPayload {
        return jwt.verify(
            token,
            env.JWT_REFRESH_SECRET
        ) as JwtPayload;
    }
}