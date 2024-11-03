import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod';

const paramsSchema = z.object({
    projectId: z.string().uuid({
        message: "projectId must be a valid UUID",
    }),
});

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);
    const client = await serverSupabaseClient(event)

    try {
        const { data: deletedProject } = await client.from('project')
            .delete()
            .eq('id', parsedParams.projectId)
            .select()
        return deletedProject;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
