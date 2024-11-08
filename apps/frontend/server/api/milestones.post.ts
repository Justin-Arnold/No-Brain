import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types';
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    projectId: z.string(),
});

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);

    const client = await serverSupabaseClient<Database>(event)
    const { data, error } = await client.from('milestone').upsert({
        name: parsedBody.name,
        description: parsedBody.description,
        project_id: parsedBody.projectId
    }).select()

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `${error}`,
        });
    }

    return data
});
