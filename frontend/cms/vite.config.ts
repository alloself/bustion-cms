import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { rm } from "node:fs/promises";

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
      indexHtml.fileName = `resources/views/${newFilename}`;
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
    renameIndexPlugin("admin.blade.php"),
    {
      name: "Cleaning assets folder",
      async buildStart() {
        await rm(resolve(__dirname, "../../public/cms"), {
          recursive: true,
          force: true,
        });
      },
    },
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
    outDir: "../../",
    rollupOptions: {
      output: {
        entryFileNames: `public/cms/js/[name].js`,
        chunkFileNames: `public/cms/js/[name].js`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }

          return `public/cms/${extType}/[name]-[hash][extname]`;
        },
        manualChunks: {
          lodash: ["lodash"],
          "vue-codemirror": ["vue-codemirror"],
        },
      },
    },
  },
});
