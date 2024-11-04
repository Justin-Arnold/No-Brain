import { serverSupabaseClient } from '#supabase/server'


export default defineEventHandler(async (event) => {
    routeAuth(event);
    const client = await serverSupabaseClient(event)
    const { data } = await client.from('task').select('*, project(*)')
    return data;
});
