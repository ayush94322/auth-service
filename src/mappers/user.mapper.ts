import type {User} from "../generated/prisma/client.js";
import type { UserResponseDto } from "../types/user.js";

export class UserMapper {
    static toResponse(
        user: User
    ): UserResponseDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}