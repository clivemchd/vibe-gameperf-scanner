import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const commonRollupOptions = {
  input: {
    popup: "popup.html",
    devtools: "devtools.html",
    panel: "panel.html"
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
        ...commonRollupOptions
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
