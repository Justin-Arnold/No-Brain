import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const paramsSchema = z.object({
    areaId: z.string().uuid({
        message: "areaId must be a valid UUID",
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

    const area = await prisma.area.findFirst({
        where: {
            id: parsedParams.areaId,
        },
        include: {
            projects: true,
            user: true,
        },
    });
    if (area === null) {
        throw createError({
            statusCode: 404,
            statusMessage: "Project not found",
        });
    }
    if (area.user?.id === parsedQuery.id) {
        return area;
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }
});