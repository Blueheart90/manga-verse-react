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
                plumpPurpleLight: '#F5EFFB',
                plumpPurple: '#6f42c1',
                plumpPurpleDark: '#5A2494',
                turquoise: '#4cebfc',
                gold: '#ffd702',
            },
            backgroundImage: {
                'gradient-yamada':
                    "linear-gradient(180deg, rgba(255,255,255,0) 68%, rgba(255,255,255,1) 96%), url('storage/assets/render_yamada_anna.webp')",
                'gradient-momo':
                    "linear-gradient(180deg, rgba(255,255,255,0) 68%, rgba(255,255,255,1) 96%), url('storage/assets/render_momo.webp')",
            },
        },
    },

    plugins: [forms],
};
