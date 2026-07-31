import { comparePassword, hashPassword } from "../utils/password.js";
import { UserRepository } from "../repositories/user.repository.js";
import { ConflictError } from "../errors/ConflictError.js";
import type { LoginDto, RegisterDto } from "../types/auth.js";
import { UserMapper } from "../mappers/user.mapper.js";
import { JwtService } from "./jwt.service.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { hashToken } from "../utils/hash.js";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository.js";

export class AuthService {
    constructor(
        private readonly userRepository = new UserRepository(),
        private readonly jwtService = new JwtService(),
        private readonly refreshTokenRepository = new RefreshTokenRepository()
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

    async login(data: LoginDto) {
        const user = await this.userRepository.findByEmail(
            data.email
        );
        if(!user) {
            throw new UnauthorizedError("Invalid email or password");
        }

        if(!user.passwordHash) {
            throw new UnauthorizedError("Invalid email or password");
        }
        const valid = await comparePassword(
            data.password,
            user.passwordHash
        );
        if(!valid) {
            throw new UnauthorizedError("Invalid email or password");
        }
        const payload = {
            sub: user.id,
            role: user.role
        }
        const accessToken = this.jwtService.generateAccessToken(payload);
        const refreshToken = this.jwtService.generateRefreshToken(payload);

        const expiresAt = new Date(
            Date.now() + 7*24*60*60*1000
        );
        const tokenHash = hashToken(refreshToken);
        await this.refreshTokenRepository.create({
            tokenHash,
            userId: user.id,
            expiresAt
        });

        return {
            user: UserMapper.toResponse(user),
            accessToken,
            refreshToken
        };
    }
}