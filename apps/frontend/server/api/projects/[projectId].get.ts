import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const paramsSchema = z.object({
    projectId: z.string().uuid({
        message: "projectId must be a valid UUID",
    }),
});

const querySchema = z.object({
    id: z.string().uuid({
        message: "id must be a valid UUID",
    }),
});



const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);
    const query = getQuery(event);
    const parsedQuery = parseData(query, querySchema);

    const project = await prisma.project.findFirst({
        where: {
            id: parsedParams.projectId,
        },
        include: {
            tasks: true,
            user: true,
        },
    });
    if (project === null) {
        throw createError({
            statusCode: 404,
            statusMessage: "Project not found",
        });
    }
    if (project.user?.id === parsedQuery.id) {
        return project;
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }
});
