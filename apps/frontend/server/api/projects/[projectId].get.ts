import { serverSupabaseClient } from '#supabase/server'
import type { Database } from "../../../types/database.types"
import { z } from 'zod';

const paramsSchema = z.object({
    projectId: z.string(),
});

const querySchema = z.object({
    id: z.string().uuid({
        message: "id must be a valid UUID",
    }),
});

export default defineEventHandler(async (event) => {

    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);

    const query = getQuery(event);

    const parsedQuery = parseData(query, querySchema);
    const client = await serverSupabaseClient<Database>(event)

    const { data } = await client.from('project').select(`*, user(*), task(*), milestone(*)`)
        .eq('id', parsedParams.projectId)
        .single();

    if (data === null) {
        throw createError({
            statusCode: 404,
            statusMessage: "Project not found",
        });
    }
    if (data.user_id === parsedQuery.id) {
        return data;
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }
});
