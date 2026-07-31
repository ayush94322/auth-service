import {prisma} from "../lib/prisma.js";

export class RefreshTokenRepository {
    async create(data:{
        tokenHash: string;
        userId: string;
        expiresAt: Date;
    }) {
        return prisma.refreshToken.create({
            data
        })
    }

    async findByTokenHash(
        tokenHash: string
    ) {
        return prisma.refreshToken.findUnique({
            where: {
                tokenHash
            }
        });
    }

    async delete(
        id: string
    ) {
        return prisma.refreshToken.delete({
            where: {
                id
            }
        });
    }

    async deleteByUserId(
        userId: string
    ) {
        return prisma.refreshToken.deleteMany({
            where: {
                userId
            }
        });
    }
}