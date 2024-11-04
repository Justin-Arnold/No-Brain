import type { UUID } from "crypto";

export default async (areaId: UUID | string) => {
    const user = useSupabaseUser()

    try {
        const { data: area, refresh } = await useFetch(
            `/api/areas/${areaId}`,
            { query: { id: user.value?.id } },
        );

        return {
            value: area.value[0],
            refresh,
        }
    } catch (e) {
        throw createError({
            status: 500,
            statusMessage: e as string
        })
    }
}