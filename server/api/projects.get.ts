import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    if (!query.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing ID for authenticated user on request",
        });
    }
    const authenticatedID = JSON.stringify(query.id);
    const parsedID = authenticatedID.replace(/['"]+/g, ""); // TODO Figure out why it is necessary to remove quotes from the ID
    const projects = await prisma.project.findMany({
        where: {
            user_id: parsedID,
        },
        include: {
            user: true,
        },
    });
    return projects;
});
