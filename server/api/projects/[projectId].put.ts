import { PrismaClient, Project } from "@prisma/client";
import { z } from "zod";

const paramsSchema = z.object({
    projectId: z.string().uuid({
        message: "projectId must be a valid UUID",
    }),
});

const bodySchema: z.ZodType<Partial<Project>> = z.object({
    name: z.string().optional(),
})

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);

    try {
        const returnedProject = await prisma.project.update({
            where: {
                id: parsedParams.projectId,
            },
            data: parsedBody,
        });
        return returnedProject;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
