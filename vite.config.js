import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import manifestSRI from 'vite-plugin-manifest-sri';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/app.scss', 'resources/ts/app.ts'],
            refresh: {
                paths: ['/resources/**', '/storage/framework/views/**'],
                config: { delay: 300, refresh: false }
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
