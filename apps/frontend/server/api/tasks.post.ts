import { serverSupabaseClient } from '#supabase/server'
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    projectId: z.string(),
    order: z.number(),
});

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);


    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from('task').insert([{
        name: parsedBody.name,
        order: parsedBody.order,
        project_id: parsedBody.projectId
    }]).select()

    return data
});
