<script lang="ts">
enum SizeValue {
    SMALL = '1.2rem',
    MEDIUM = '1.6rem',
    LARGE = '2.0rem'
}
</script>

<script lang="ts" setup>
const {
    name,
    size = 'md'
} = defineProps<{
    name: string
    size?: 'sm' | 'md' | 'lg'
}>();

const sizeValue = computed(() => {
    switch (size) {
        case 'sm':
            return SizeValue.SMALL
        case 'md':
            return SizeValue.MEDIUM
        case 'lg':
            return SizeValue.LARGE
        default:
            return exhaustiveCheck(size)
    }
})
</script>

<template>
    <Icon :name="name" :size="sizeValue" class="transition-all duration-300" />
</template>