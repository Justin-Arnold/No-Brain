<script setup lang="ts">

const route = useRoute()
const projectId = route.params.projectId
const userID = route.query.id
const { data: project, refresh } = await useFetch(`/api/projects/${projectId}`, {
    query: { id: userID },
})

const newTask = ref('')

const addTask = async () => {
    if (!project.value) return
    const { data } = await useFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ name: newTask.value, projectId: route.params.projectId, order: project.value.tasks.length }),
    })
    refresh()
}

const updateTask = async (id: number, name: string, completed: boolean, order: string | number) => {
    await useFetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, completed: !completed, order}),
    })
    refresh()
}

const sortedTasks = computed({
    get() {
        if (!project.value) return []
        return project.value.tasks.sort((a, b) => a.order - b.order)
    },
    set(value) {
        value.forEach(async (task, index) => {
            await useFetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: task.name, completed: task.completed, order: index }),
            })
        })
        refresh()
    },
})

const drag = ref(false)

const move = (moveEvent: any) => {
    console.log(moveEvent)
}

</script>

<template>
    <div class="flex h-full">
        <div class="p-4 h-full flex flex-col gap-4 w-1/3 flex-shrink-0">
            <input
                type="text"
                v-model="newTask"
                placeholder="Add a new task"
            />
            <button @click="addTask">
                Add
            </button>
            <!-- <div class="overflow-y-auto flex flex-col gap-2">
                <span v-for="task in sortedTasks" class="bg-white/10 p-2 rounded flex justify-between gap-4" :class="{'line-through opacity-50': task.completed}">
                    <span>
                        {{ task.name }}
                    </span>
                    <input
                        type="checkbox"
                        :checked="task.completed"
                        @change="updateTask(task.id, task.name, task.completed)"
                    />
                </span>
            </div> -->
            <draggable
            v-model="sortedTasks"
            @start="drag=true"
            @end="drag=false"
            item-key="id"
            tag="span"
            class="flex flex-col gap-2"
            :move="move"
            >
                <template #item="{element}">
                    <span class="bg-white/10 p-2 rounded flex justify-between gap-4 select-none cursor-pointer" :class="{'line-through opacity-50': element.completed}">
                        <span>
                            {{ element.name }}
                        </span>
                        <input
                            type="checkbox"
                            :checked="element.completed"
                            @change="updateTask(element.id, element.name, element.completed, element.order)"
                        />
                    </span>
                </template>
            </draggable>
        </div>
        <div class="p-4 h-full flex flex-col gap-4">
            <input type="text" v-model="newTask" placeholder="Add a new task">
            <button @click="addTask">Add</button>
            <div class="overflow-y-auto flex flex-col gap-2">
                <span v-for="note in project?.notes" class="bg-white/10 p-2 rounded flex flex-col justify-between gap-4">
                    <span class="text-lg font-semibold">{{ note.name }}</span>
                    <span>{{ note.content }}</span>
                </span>
            </div>
        </div>
    </div>
</template>
