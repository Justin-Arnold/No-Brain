<script setup lang="ts">

defineProps<{
    isFlipped: boolean
}>()


</script>

<template>
    <div class="card-container">
        <div class="card" :class="{ flipped: isFlipped }">
            <div class="card-front">
                <slot name="front" />
            </div>
            <div class="card-back">
                <slot name="back" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    perspective: 1000px;
    width: 100%;
}

.card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
}

.card.flipped {
    transform: rotateY(180deg);
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}


.card-back {
    transform: rotateY(180deg);
}

</style>