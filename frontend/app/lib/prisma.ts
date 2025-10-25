// prisma.ts
import { PrismaClient } from "@prisma/client";

/**
 * Create a singleton PrismaClient to avoid exhausting DB connections
 * during hot-reloads (e.g. Next.js dev mode).
 *
 * Requires an environment variable: DATABASE_URL
 * Example .env:
 *   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
 */

declare global {
  // allow global var in dev to persist between module reloads
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClient = global.prisma || new PrismaClient({
  // Optional: enable query logging in non-production for debugging
  log: process.env.NODE_ENV === "production" ? [] : ["query", "info", "warn", "error"],
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaClient;
}

export default prismaClient;
export type Prisma = PrismaClient;
