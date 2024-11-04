import { serverSupabaseClient } from '#supabase/server'
import type { Database } from "../../../types/database.types"
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

export default defineEventHandler(async (event) => {
    const parsedParams = parseData(event.context.params, paramsSchema)

    const body = await readBody(event)
    const parsedBody = parseData(body, bodySchema)

    const client = await serverSupabaseClient<Database>(event)

    const { data: task } = await client
        .from('task')
        .update(parsedBody)
        .eq('id', parsedParams.taskId)

    return task;
});
