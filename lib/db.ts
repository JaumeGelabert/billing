import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () =>
  new PrismaClient().$extends(withAccelerate());

type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

declare global {
  var prisma: ExtendedPrismaClient | undefined;
}

export const db: ExtendedPrismaClient =
  globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
