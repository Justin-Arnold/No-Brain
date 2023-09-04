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

    const areas = await prisma.area.findMany({
        where: {
            user_id: parsedQuery.id,
        },
    });
    return areas;
});
