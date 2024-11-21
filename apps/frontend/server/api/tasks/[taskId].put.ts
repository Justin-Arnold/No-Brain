import { serverSupabaseClient } from '#supabase/server'
import type { Database } from "../../../types/database.types"
import { z } from "zod";

const paramsSchema = z.object({
    taskId: z.string().uuid({
        message: "taskId must be a valid UUID",
    }),
});

const bodySchema = z.object({
    name: z.string().optional(),
    status: z.string().optional(),
    order: z.number().optional(),
    milestone_id: z.string().optional()
});

export type TaskUpdateBody = z.infer<typeof bodySchema>;

export default defineEventHandler(async (event) => {
    const parsedParams = parseData(event.context.params, paramsSchema)

    const body = await readBody(event)
    const parsedBody = parseData(body, bodySchema)

    console.log('p', parsedBody)

    const client = await serverSupabaseClient<Database>(event)

    const { data: task, error } = await client
        .from('task')
        .update(parsedBody)
        .eq('id', parsedParams.taskId)
        .select()

    if (error) {
        throw createError(error)
    }
    return task;
});
