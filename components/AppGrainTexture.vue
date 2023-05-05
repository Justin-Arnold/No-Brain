<template>
    <svg width="0" height="0" class="absolute hidden">
        <filter id="grainy" x="0" y="0">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.7"
                result="fractalNoise"
            ></feTurbulence>
            <feComposite
                in="colorMatrix"
                in2="SourceGraphic"
                operator="over"
                result="composite"
            ></feComposite>
        </filter>
    </svg>
</template>

<style>
body::before {
    @apply absolute left-0 top-0 content-none w-full h-full z-[9999] opacity-30 pointer-events-none;
    filter: url(#grainy);
}
</style>
