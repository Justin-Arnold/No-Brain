import { z } from "zod";
import { serverSupabaseClient } from "#supabase/server";

const bodySchema = z.object({
    name: z.string(),
    projectId: z.string(),
    order: z.number().optional(),
    milestoneId: z.string().optional()
});

export default defineEventHandler(async (event) => {
    routeAuth(event);
    const body = await readBody(event);
    const parsedBody = parseData(body, bodySchema);


    const client = await serverSupabaseClient(event)
    const { data, error } = await client
        .from("task")
        .insert([
            {
                name: parsedBody.name,
                project_id: parsedBody.projectId,
                order: parsedBody.order,
                milestone_id: parsedBody.milestoneId,
            }])
        .select()
    if (error) {
        return createError(error)
    }
    return data
});
