import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types';
import { z } from 'zod';

const querySchema = z.object({
    id: z.string().uuid({
        message: "Invalid ID",
    }),
});


export default defineEventHandler(async (event) => {
    routeAuth(event);
    const query = getQuery(event);
    const parsedQuery = parseData(query, querySchema);

    const client = await serverSupabaseClient<Database>(event)
    const { data } = await client
        .from('area')
        .select('*')
        .eq('user_id', parsedQuery.id);

    return data;
});
