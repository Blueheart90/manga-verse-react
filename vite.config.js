import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'), // Alias para la carpeta `resources/js`
            '@components': path.resolve(__dirname, 'resources/js/Components'), // Alias para componentes
            '@pages': path.resolve(__dirname, 'resources/js/Pages'), // Alias para páginas
            '@assets': path.resolve(__dirname, 'resources/assets'), // Alias para assets
        },
    },
});
