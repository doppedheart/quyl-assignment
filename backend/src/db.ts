import { PrismaClient } from "@prisma/client";

class DB {
  private static instance: DB;
  private prisma: PrismaClient;
  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public getPrisma(): PrismaClient {
    return this.prisma;
  }

  public async disconnect() {
    await this.prisma.$disconnect();
  }
}

export const db = DB.getInstance().getPrisma();
