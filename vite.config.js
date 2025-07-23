 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './home.html',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        home: './home.html', // your main entry
      },
      output: {
        // Single JS bundle name
        entryFileNames: `assets/lpm.js`,
        // Single CSS file name (if extracted)
        chunkFileNames: `assets/lpm.js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/lpm.css'
          }
          return 'assets/[name].[ext]'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['dev'] // don't pre-bundle dev folder
  },
})


