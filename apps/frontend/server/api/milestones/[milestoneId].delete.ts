import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod';

const paramsSchema = z.object({
    milestoneId: z.string().uuid({
        message: "miletsoneId must be a valid UUID",
    }),
});

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);
    const client = await serverSupabaseClient(event)

    try {
        const { data: deletedMilestone } = await client.from('milestone')
            .delete()
            .eq('id', parsedParams.milestoneId)
            .select()
        return deletedMilestone;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }
});
