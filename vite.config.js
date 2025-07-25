import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './home.html',
  plugins: [vue()],
  build: {
    outDir: 'assets-classic',
    cssCodeSplit: false, // <-- ensures one CSS file, not per component
    rollupOptions: {
      input: {
        home: './home.html'
      },
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        name: 'MyApp',
        entryFileNames: 'js/lpm.js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/lpm.css'
          }
          return 'assets/[name][extname]'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['dev']
  }
})
