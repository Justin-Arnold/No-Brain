import { PrismaClient, Project } from "@prisma/client";
import { z } from "zod";

const paramsSchema = z.object({
    areaId: z.string().uuid({
        message: "projectId must be a valid UUID",
    }),
});

const bodySchema: z.ZodType<Partial<Project>> = z.object({
    name: z.string().optional(),
});


const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);

        console.log("parsedParams", body, parsedBody);
    try {
        const returnedArea = await prisma.area.update({
            where: {
                id: parsedParams.areaId,
            },
            data: parsedBody,
        });
        return returnedArea;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
