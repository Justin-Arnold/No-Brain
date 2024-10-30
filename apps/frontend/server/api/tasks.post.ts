import { serverSupabaseClient } from '#supabase/server'
import { randomUUID } from 'crypto';
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

    console.log('Parsed Body:', parsedBody)

    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from('task').insert([{
        name: parsedBody.name,
        order: parsedBody.order,
        project_id: parsedBody.projectId
    }]).select()

    console.log('ddd', data, error)

    return data
});
