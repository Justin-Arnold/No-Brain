const baseFontSizePlugin = require('tailwindcss-base-font-size');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
                'auto-fill-200':'repeat(auto-fill, minmax(200px, 1fr))',
                'auto-fill-300':'repeat(auto-fill, minmax(300px, 1fr))',
                'auto-fill-400':'repeat(auto-fill, minmax(400px, 1fr))',
                'auto-fill-500':'repeat(auto-fill, minmax(500px, 1fr))',
                'auto-fill-600':'repeat(auto-fill, minmax(600px, 1fr))',
                'auto-fill-700':'repeat(auto-fill, minmax(700px, 1fr))',
                'auto-fill-800':'repeat(auto-fill, minmax(800px, 1fr))',
                'auto-fill-900':'repeat(auto-fill, minmax(900px, 1fr))',
            },
        },
    },
    plugins: [
        baseFontSizePlugin({
            baseFontSize: 14,
        }),
    ],
};
