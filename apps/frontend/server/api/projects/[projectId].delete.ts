import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const paramsSchema = z.object({
    projectId: z.string().uuid({
        message: "projectId must be a valid UUID",
    }),
});

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);

    try {
        const returnedProject = await prisma.project.delete({
            where: {
                id: parsedParams.projectId,
            },
        });
        return returnedProject;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
