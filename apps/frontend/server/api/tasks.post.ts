import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    projectId: z.string().uuid({
        message: "projectId must be a valid UUID",
    }),
    order: z.number(),
});

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);

    const task = await prisma.task.create({
        data: {
            name: parsedBody.name,
            order: parsedBody.order,
            project: {
                connect: {
                    id: parsedBody.projectId,
                },
            },
        },
    });

    return task;
});
