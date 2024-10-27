/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{svelte,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'tts-gold': 'rgb(137, 113, 72)', //
                'tts-purple': 'rgb(63, 34, 74)', //
            },
            fontFamily: {
                'serif-custom': ['"Times New Roman"', 'Times', 'serif'],
                'grotesque': ['Brandon Grotesque', 'Arial', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
