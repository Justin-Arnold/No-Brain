import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody(event);
    if (!body) {
        return new Response("No body", { status: 400 });
    }
    if (!body.name) {
        return new Response("No name", { status: 400 });
    }

    if (!body.projectId) {
        return new Response("No projectId", { status: 400 });
    }

    if (!body.order) {
        return new Response("No order set on task", { status: 400 });
    }

    const task = await prisma.task.create({
        data: {
            name: body.name,
            order: parseInt(body.order),
            project: {
                connect: {
                    id: body.projectId,
                },
            },
        },
    });

    return task;
});
