import { PrismaClient } from "@prisma/client";
import { parseBodyAs, parseParamsAs } from "@sidebase/nuxt-parse";
import { z } from "zod";

const prisma = new PrismaClient();

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

export default defineEventHandler(async (event) => {
    const params = parseParamsAs(
        event,
        paramsSchema,
        400,
        "Error Parsing Params, please check response data for more info",
    );
    const body = await parseBodyAs(
        event,
        bodySchema,
        400,
        "Error Parsing Body, please check response data for more info",
    );

    const task = await prisma.task.update({
        where: {
            id: params.taskId,
        },
        data: body,
    });

    return task;
});
