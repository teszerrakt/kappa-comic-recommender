import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    include: /src\/.*\.(js|ts|jsx|tsx)$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx'
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  define: {
    // For compatibility with existing code
    'process.env': {}
  },
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})