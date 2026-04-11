// Prisma client singleton.
// Next.js in dev hot-reloads modules, which would otherwise open a new
// PrismaClient on every reload and exhaust the Postgres connection pool.
// The `globalThis` trick keeps exactly one client across reloads.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
