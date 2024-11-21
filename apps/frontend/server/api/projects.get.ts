import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { Project } from '~/types/Project.types'
import { z } from 'zod';

const querySchema = z.object({
    id: z.string().uuid({
        message: "Invalid ID",
    }),
});


export default defineEventHandler(async (event): Promise<Project[]> => {
    routeAuth(event);
    const query = getQuery(event);
    const parsedQuery = parseData(query, querySchema);


    const client = await serverSupabaseClient<Database>(event)
    const { data, error } = await client.from('project').select('*').eq('user_id', parsedQuery.id);

    if (error) {
        throw createError(error)
    }
    return data;
});
