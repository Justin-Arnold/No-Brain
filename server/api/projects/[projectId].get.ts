import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const projectId = event.context.params?.projectId;
    if (!projectId) {return new Response("No projectId", { status: 400 })}
    return prisma.projects.findUnique({
        where: {
            id: parseInt(projectId)
        },
        include: {
            tasks: true
        }
    });
})