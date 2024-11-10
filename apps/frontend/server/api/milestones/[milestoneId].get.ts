import { serverSupabaseClient } from '#supabase/server'
import type { Database } from "../../../types/database.types"
import { z } from 'zod';

const paramsSchema = z.object({
    milestoneId: z.string(),
});

export default defineEventHandler(async (event) => {

    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);
    const client = await serverSupabaseClient<Database>(event)

    const { data } = await client.from('milestone').select(`*`)
        .eq('id', parsedParams.milestoneId)
        .single();

    if (data === null) {
        throw createError({
            statusCode: 404,
            statusMessage: "Milestone not found",
        });
    }

    return data
});
