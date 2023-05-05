import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    if (!body) {
        return new Response("No body", { status: 400 })
    }
    if (!body.name) {
        return new Response("No name", { status: 400 })
    }

    const task = await prisma.tasks.create({
        data: {
            name: body.name
        },
    });

    return task;
})