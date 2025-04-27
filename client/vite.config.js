import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    plugins: [react()],
    outDir: 'build',
    emptyOutDir: true, // empties the directory before building
    minify: 'terser', // or 'esbuild'
    sourcemap: true, // generate source maps
    // ... other options
  }
})