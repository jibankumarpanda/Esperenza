// prisma.ts
/**
 * Lazy-load PrismaClient at runtime to avoid bundlers (Turbopack) trying to
 * evaluate `@prisma/client` during module analysis. Export a getter so
 * code can call it when running on the Node server.
 */

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

export function getPrisma() {
  if (global.prisma) return global.prisma;

  // Require inside the function so bundlers don't try to statically evaluate
  // @prisma/client at build time (which fails under Turbopack/Edge).
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");

  const prismaClient = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query", "info", "warn", "error"],
  });

  if (process.env.NODE_ENV !== "production") {
    global.prisma = prismaClient;
  }

  return prismaClient;
}

export type Prisma = any;
