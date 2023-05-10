import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const projectId = query.projectId as string
    if (!projectId) {
        throw createError({
            statusCode: 401,
            statusMessage: "Project ID Missing"
        })
    }
    const project = await prisma.project.findUnique({
        where: {
            id: parseInt(projectId)
        },
        include: {
            tasks: true,
            notes: true
        }
    })
    if (project === null) {
        throw createError({
            statusCode: 404, statusMessage: "Project not found"
        })
    }
    return project
})
