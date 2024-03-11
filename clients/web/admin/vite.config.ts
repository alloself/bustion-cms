
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression';
import manifestSRI from 'vite-plugin-manifest-sri';
import { resolve } from "path";
import { rm } from "node:fs/promises";
import eslint from 'vite-plugin-eslint'

const renameIndexPlugin = (newFilename: string) => {
  if (!newFilename) return;

  return {
    name: "renameIndex",
    enforce: "post",
    generateBundle(options, bundle) {
      const indexHtml = bundle["index.html"];
      indexHtml.fileName = `../resources/views/${newFilename}`;
    },
  };
};

const removeBuildFolder = () => {
  return {
    name: "Cleaning assets folder",
    async buildStart() {
      await rm(resolve(__dirname, "./public/client/admin"), {
        recursive: true,
        force: true,
      });
    },
  };
};


export default defineConfig({
  //@ts-ignore
  plugins: [
    eslint(),
    vue({
      template: { transformAssetUrls },
      script: {
        propsDestructure: true,
        defineModel: true
      }
    }),
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    // @ts-ignore
    viteCompression({
      algorithm: 'brotliCompress'
    }),
    // @ts-ignore
    manifestSRI(),
    // @ts-ignore
    renameIndexPlugin("admin.blade.php"),
    removeBuildFolder(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3001,
  },
  build: {
    emptyOutDir: false,
    outDir: "../../../public/",
    rollupOptions: {
      output: {
        entryFileNames: `client/admin/js/[name].js`,
        chunkFileNames: `client/admin/js/[name].js`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }

          return `client/admin/${extType}/[name]-[hash][extname]`;
        },
        manualChunks: {
          lodash: ["lodash"],
          "vue-codemirror": ["vue-codemirror"],
        },
      },
    },
  },
})
