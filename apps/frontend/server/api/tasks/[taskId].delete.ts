import { serverSupabaseClient } from '#supabase/server'
import { z } from "zod";

const paramsSchema = z.object({
    taskId: z.string().uuid({
        message: "taskId must be a valid UUID",
    }),
});

export default defineEventHandler(async (event) => {
    const parsedParams = parseData(event.context.params, paramsSchema)

    try {
        const client = await serverSupabaseClient(event)
        const { data: task } = await client.from('task')
            .delete()
            .eq('id', parsedParams.taskId)
            .select()

        if (!task) {
            throw createError({
                statusCode: 404,
                statusMessage: "Task Not Found",
            });
        }
        return task
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
