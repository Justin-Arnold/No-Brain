import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types';
import { z } from 'zod';

const paramsSchema = z.object({
    areaId: z.string()
});

const querySchema = z.object({
    id: z.string()
});

export default defineEventHandler(async (event) => {

    routeAuth(event);
    const parsedParams = parseData(event.context.params, paramsSchema);

    const query = getQuery(event);
    const parsedQuery = parseData(query, querySchema);

    const client = await serverSupabaseClient<Database>(event)
    const { data: area } = await client
        .from('area')
        .select('*')
        .eq('id', parsedParams.areaId);

    return area
});