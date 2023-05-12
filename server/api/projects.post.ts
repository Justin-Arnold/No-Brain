import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing body"
        })
    }
    if (!body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing name"
        })
    }
    if (!body.userId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing user ID"
        })
    }

    const task = await prisma.project.create({
        data: {
            name: 'New Project',
            user_id: body.userId
        },
    });

    return task;
})