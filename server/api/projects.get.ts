import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    if (!query.id) {return new Response("Missing ID for authenticated user on request", { status: 400 })}
    const authenticatedID = JSON.stringify(query.id)
    const parsedID = authenticatedID.replace(/['"]+/g, '') // TODO Figure out why it is necessary to remove quotes from the ID
    return prisma.project.findMany({
        where: {
            user_id: parsedID
        },
        include: {
            user: true,
            notes: true,
        }
    });
})