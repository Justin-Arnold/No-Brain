import { z } from 'zod'

export default function parseData<T>(data: Record<any, any> | undefined, schema: z.ZodType<T>) {
    try {
        return schema.parse(data)
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: error.issues[0].message,
            })
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: `${error}`,
            })
        }
    }
}