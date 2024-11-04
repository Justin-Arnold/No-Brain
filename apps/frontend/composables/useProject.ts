import type { UUID } from "crypto";

export default async (projectId: UUID | string) => {
    const user = useSupabaseUser()

    try {
        const { data: project, refresh } = await useFetch(
            `/api/projects/${projectId}`,
            { query: { id: user.value?.id } },
        );

        return {
            value: project.value,
            refresh,
        }
    } catch (e) {
        throw createError({
            status: 500,
            statusMessage: e as string
        })
    }
}