import { PrismaClient } from '@prisma/client';

const globalClient = global as unknown as { prisma: PrismaClient };

export const db = globalClient.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalClient.prisma = db;
