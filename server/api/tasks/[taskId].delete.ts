import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const params = event.context.params;
    if (!params) {
        throw createError({
            statusCode: 401,
            statusMessage: "Task ID Missing",
        });
    }
    console.log(params);
    try {
        const task = await prisma.task.delete({
            where: {
                id: params.taskId,
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
