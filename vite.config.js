import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import manifestSRI from 'vite-plugin-manifest-sri';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/index.scss', 'resources/js/index.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        viteCompression({
            algorithm: 'brotliCompress'
        }),
        manifestSRI()
    ],
    resolve: {
        alias: {
            '@storage': '/storage',
            '@public': '/public',
        },
    },
    build: {
        target: 'es2020'
    }
});
