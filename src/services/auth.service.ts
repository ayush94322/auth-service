import { env } from "../config/env.js";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import { ConflictError } from "../errors/ConflictError.js";
import type { RegisterDto } from "../types/auth.js";

export class AuthService {
    constructor(
        private readonly userRepository = new UserRepository()
    ){}

    async register(data: RegisterDto) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if(existingUser) {
            throw new ConflictError(
                "Email already registered"
            );
        }
        const passwordHash = await bcrypt.hash(data.password, env.BCRYPT_ROUNDS);
        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            passwordHash
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}