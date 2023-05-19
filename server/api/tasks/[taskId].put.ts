import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const taskId = event.context.params?.taskId;
    const body = await readBody(event)
    if (!taskId) {return new Response("No taskId", { status: 400 })}

    const task = await prisma.task.update({
        where: {
            id: parseInt(taskId)
        },
        data: {
            name: body.name,
            completed: body.completed,
            order: parseInt(body.order),
        },
    });

    return task;
})