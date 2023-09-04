import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    userId: z.string().uuid({
        message: "userId must be a valid UUID",
    }),
});


const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);

    try {
        const area = await prisma.area.create({
            data: {
                name: parsedBody.name,
                user_id: parsedBody.userId,
            },
        });
        return area;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
