import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/index.scss', 'resources/ts/index.ts'],
            refresh: {
                paths: ['/resources/**', '/storage/framework/views/**'],
                config: { delay: 300 }
            }
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
    ],
    resolve: {
        alias: {
            '@storage': '/storage',
            '@public': '/public',
            '@resources': '/resources',
            '@': fileURLToPath(new URL('./', import.meta.url))
        },
    },
    build: {
        target: 'es2020'
    }
});
