import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { RegisterDto } from "../types/auth.js";

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
}