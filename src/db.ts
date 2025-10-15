import { PrismaClient } from "@prisma/client";

declare global {
	var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient();

export const getClient = async () => {
	try {
		await prisma.$connect();
		return prisma;
	} catch (error) {
		console.error("Database connection failed:", error);
		return null;
	}
};

if (process.env.NODE_ENV !== "production") {
	globalThis.__prisma = prisma;
}
