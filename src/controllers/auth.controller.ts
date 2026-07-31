import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { LoginDto, RegisterDto } from "../types/auth.js";
import { accessCookieOptions, refreshCookieOptions } from "../config/cookies.js";

export class AuthController {
    constructor(
        private readonly authService = new AuthService()
    ){}

    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = await this.authService.register(req.validatedData as RegisterDto);
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user
            })
        } catch (error) {
            next(error);
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await this.authService.login(
                req.validatedData as LoginDto
            );
            res.cookie(
                "accessToken",
                result.accessToken,
                accessCookieOptions
            );
            res.cookie(
                "refreshToken",
                result.refreshToken,
                refreshCookieOptions
            );

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: result.user
            });
        } catch (error) {
            next(error);
        }
    }
}