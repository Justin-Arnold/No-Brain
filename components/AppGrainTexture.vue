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
    @apply pointer-events-none absolute left-0 top-0 z-[9999] h-full w-full opacity-30 content-none;
    filter: url(#grainy);
}
</style>
