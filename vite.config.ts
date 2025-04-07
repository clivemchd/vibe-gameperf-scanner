import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { PreRenderedChunk } from 'rollup'

const commonRollupOptions = {
  input: {
    popup: "popup.html",
    devtools: "devtools.html",
    panel: "panel.html",
    content: "src/content.ts",
    background: "src/background.ts"
  }
}

const commonContentRollupOptions = {
    entryFileNames: (chunkInfo: PreRenderedChunk) => {
      if(chunkInfo.name === 'content') {
        return 'content.js';
      }

      if(chunkInfo.name === 'background') {
        return 'background.js';
      }

      return 'assets/[name]-[hash].js';
    }
}

const getProductionConfig = () => {
  return {
    build: {
      sourcemap: false,
      minify: 'terser' as const,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        output: {
          comments: false,
        },
      },
      rollupOptions: {
        ...commonRollupOptions,
        output: {
          ...commonContentRollupOptions,
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      }
    }
  }
}

const getDevlopmentConfig = () => {
  return {
    build: {
      sourcemap: true,
      minify: false,
      rollupOptions: {
        ...commonRollupOptions,
        output: {
          ...commonContentRollupOptions,
        },
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  
  return {
    plugins: [react()],
    ...(isDevelopment ? getDevlopmentConfig() : getProductionConfig())
  }
})
