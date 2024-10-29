import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const querySchema = z.object({
    id: z.string().uuid({
        message: "Invalid ID",
    }),
});

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    routeAuth(event);
    const query = getQuery(event);
    const parsedQuery = parseData(query, querySchema);

    const projects = await prisma.project.findMany({
        where: {
            user_id: parsedQuery.id,
        },
        include: {
            user: true,
        },
    });
    return projects;
});
