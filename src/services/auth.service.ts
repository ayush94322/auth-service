import { hashPassword } from "../utils/password.js";
import { UserRepository } from "../repositories/user.repository.js";
import { ConflictError } from "../errors/ConflictError.js";
import type { RegisterDto } from "../types/auth.js";
import { UserMapper } from "../mappers/user.mapper.js";
import { JwtService } from "./jwt.service.js";

export class AuthService {
    constructor(
        private readonly userRepository = new UserRepository(),
        private readonly jwtService = new JwtService()
    ){}

    async register(data: RegisterDto) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if(existingUser) {
            throw new ConflictError(
                "Email already registered"
            );
        }
        const passwordHash = await hashPassword(data.password);
        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            passwordHash
        });

        return UserMapper.toResponse(user);
    }
}