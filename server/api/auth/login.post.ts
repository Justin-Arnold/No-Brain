type LoginBody = {
    email: string;
    password: string;
};

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginBody>(event);
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "Body must not be empty",
        });
    }
    if (!body.email) {
        throw createError({
            statusCode: 400,
            statusMessage: "Username must not be empty",
        });
    }
    if (!body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Password must not be empty",
        });
    }

    // const { data, error } = await supabase.auth.signInWithPassword({
    //     email: 'example@email.com',
    //     password: 'example-password',
    // })

    // return task;
});
