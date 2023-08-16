import { PrismaClient, Project } from "@prisma/client";

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
    const objectWithParamsToUpdate = await readBody<Partial<Project>>(event);
    try {
        const returnedProject = await prisma.project.update({
            where: {
                id: params.projectId,
            },
            data: objectWithParamsToUpdate,
        });
        return returnedProject;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
