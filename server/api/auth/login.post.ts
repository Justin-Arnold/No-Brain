import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body) {
        return new Response("No body", { status: 400 })
    }
    if (!body.email) {
        return new Response("No email", { status: 400 })
    }
    if (!body.password) {
        return new Response("No password", { status: 400 })
    }

    // const { data, error } = await supabase.auth.signInWithPassword({
    //     email: 'example@email.com',
    //     password: 'example-password',
    // })


    // return task;
})