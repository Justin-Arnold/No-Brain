import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const params = event.context.params
    if (!params) {
        throw createError({
            statusCode: 401,
            statusMessage: "Project ID Missing"
        })
    }
    const projectId = params.projectId
    const query = getQuery(event)
    if (!query.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing ID for authenticated user on request"
        })
    }
    const authenticatedID = JSON.stringify(query.id)
    const parsedID = authenticatedID.replace(/['"]+/g, '') // TODO Figure out why it is necessary to remove quotes from the ID
    const project = await prisma.project.findFirst({
        where: {
            id: parseInt(projectId),
        },
        include: {
            tasks: true,
            notes: true,
            user: true
        }
    })
    if (project === null) {
        throw createError({
            statusCode: 404, statusMessage: "Project not found"
        })
    }
    if (project.user?.linked_id === parsedID) {
        return project
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }
})
