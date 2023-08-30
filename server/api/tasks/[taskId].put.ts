import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const paramsSchema = z.object({
    taskId: z.string().uuid({
        message: "taskId must be a valid UUID",
    }),
});

const bodySchema = z.object({
    name: z.string(),
    completed: z.boolean({
        required_error: "Completed is required",
        invalid_type_error: "Completed must be a boolean",
    }),
    order: z.number(),
});

export type TaskUpdateBody = z.infer<typeof bodySchema>;

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const parsedParams = parseData(event.context.params, paramsSchema)

    const body = await readBody(event)
    const parsedBody = parseData(body, bodySchema)

    const task = await prisma.task.update({
        where: {
            id: parsedParams.taskId,
        },
        data: parsedBody,
    });

    return task;
});
