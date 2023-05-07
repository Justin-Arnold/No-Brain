import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    return prisma.task.findMany({
        include: {
            project: true
        }
    });
})