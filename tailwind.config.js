import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                bubblegum: ['Bubblegum Sans', ...defaultTheme.fontFamily.sans],
                sintony: ['Sintony', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                plumpPurple: '#6f42c1',
                plumpPurpleDark: '#5f25a6',
                turquoise: '#4cebfc',
                gold: '#ffd702',
            },
        },
    },

    plugins: [forms],
};
