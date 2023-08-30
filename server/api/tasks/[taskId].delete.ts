import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const paramsSchema = z.object({
    taskId: z.string().uuid({
        message: "taskId must be a valid UUID",
    }),
});

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const parsedParams = parseData(event.context.params, paramsSchema)

    try {
        const task = await prisma.task.delete({
            where: {
                id: parsedParams.taskId,
            },
        });
        if (!task) {
            throw createError({
                statusCode: 404,
                statusMessage: "Task Not Found",
            });
        }
        return task
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
