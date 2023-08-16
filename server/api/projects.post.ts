import { PrismaClient } from "@prisma/client";

type ProjectPostBody = {
    name: string;
    userId: string;
};

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody<ProjectPostBody>(event);
    if (!body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing name",
        });
    }
    if (!body.userId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing user ID",
        });
    }
    try {
        const task = await prisma.project.create({
            data: {
                name: body.name,
                user_id: body.userId,
            },
        });
        return task;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
