import { serverSupabaseClient } from '#supabase/server'
import { cpSync } from 'fs';
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    userId: z.string().uuid({
        message: "userId must be a valid UUID",
    }),
});



export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);

    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from('project').upsert({
        name: parsedBody.name,
        description: parsedBody.description,
        user_id: parsedBody.userId
    }).select()

    // try {
    //     const task = await prisma.project.create({
    //         data: {
    //             name: parsedBody.name,
    //             user_id: parsedBody.userId,
    //         },
    //     });
    //     return task;
    // } catch (error) {
    //     throw createError({
    //         statusCode: 500,
    //         statusMessage: `${error}`,
    //     });
    // }
});
