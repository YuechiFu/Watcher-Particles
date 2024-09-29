
import vue from '@vitejs/plugin-vue'
import wasm from "vite-plugin-wasm"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import topLevelAwait from "vite-plugin-top-level-await"
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig, splitVendorChunkPlugin } from "vite"
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // basicSsl(),
    vue(),
    wasm(),
    topLevelAwait(),
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: "vue-next"
        })
      ]
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: "vue-next"
        })
      ]
    }),
    splitVendorChunkPlugin()
  ],
  

  resolve: {
    alias: {
      "@": "/src"
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    extensions: [".ts", ".js", ".vue", ".css"]
  },

  server: {
    port: 1089,
    // strictPort: true,
    host: true,
    // https: true,
  },
  preview: {
    host: true,
    port: 1099,
  },
})
