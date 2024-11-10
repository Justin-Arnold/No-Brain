// import { serverSupabaseClient } from '#supabase/server'
// import type { Database } from "../../../types/database.types"
// import { z } from "zod";

// const paramsSchema = z.object({
//     milestoneId: z.string().uuid({
//         message: "projectId must be a valid UUID",
//     }),
// });

// const bodySchema = z.object({
//     name: z.string().optional(),
//     area_id: z.string().uuid({
//         message: "area_id must be a valid UUID",
//     }).optional()
// });

// export default defineEventHandler(async (event) => {

//     routeAuth(event);
//     const parsedParams = parseData(event.context.params, paramsSchema);
//     const body = await readBody(event);
//     const parsedBody = parseData(body, bodySchema);

//     const client = await serverSupabaseClient<Database>(event)

//     try {
//         const project = await client
//             .from('project')
//             .update(parsedBody)
//             .eq('id', parsedParams.projectId)
//             .select()
//             .single()

//         return project;
//     } catch (error) {
//         throw createError({
//             statusCode: 500,
//             statusMessage: `${error}`,
//         });
//     }
// });
