
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

/**
 * @param newFilename {string}
 * @returns {import('vite').Plugin}
 */
const renameIndexPlugin = (newFilename) => {
  if (!newFilename) return;

  return {
    name: "renameIndex",
    enforce: "post",
    generateBundle(options, bundle) {
      const indexHtml = bundle["index.html"];
      indexHtml.fileName = newFilename;
    },
  };
};


export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
    }),
    renameIndexPlugin('admin.blade.php'),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: '../../',
    rollupOptions: {
      output: {
        entryFileNames: `cms/assets/js/[name].js`,
        chunkFileNames: `cms/assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `public/cms/assets/images/[name]-[hash][extname]`;
          }
          if (/js/i.test(extType)) {
            return `public/cms/assets/js/[name]-[hash][extname]`;
          }

          if (/html/i.test(extType)) {
            return `resources/views/[name]-[hash][extname]`;
          }
          return `public/cms/assets/${extType}[name]-[hash][extname]`;
        },
        manualChunks: {
          lodash: ["lodash"],
          "vue-codemirror": ["vue-codemirror"],
        },
      },
    },
  },
});
