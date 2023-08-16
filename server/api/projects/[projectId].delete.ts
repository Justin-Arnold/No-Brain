import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const params = event.context.params;
    if (!params) {
        throw createError({
            statusCode: 401,
            statusMessage: "Project ID Missing",
        });
    }
    try {
        const returnedProject = await prisma.project.delete({
            where: {
                id: params.projectId,
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
