import { PrismaClient } from "@prisma/client";

declare global {
  // Esto asegura que la variable global `prisma` esté disponible en todo el proyecto
  // para evitar crear múltiples instancias de Prisma en desarrollo.
  var prisma: PrismaClient | undefined;
}

// Reutiliza la instancia de Prisma en desarrollo, pero crea una nueva en producción.
const prismadb = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismadb;
}

export default prismadb;
