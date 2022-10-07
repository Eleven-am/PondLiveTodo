/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.{html,js,ts}"],
    theme: {
        extend: {
            screens: {
                'xs': '320px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            }
        },
    },
    plugins: [],
}
