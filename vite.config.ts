import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import neon from './neon-vite-plugin.ts'

const config = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    neon,
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  optimizeDeps: {
    exclude: ["@xmtp/wasm-bindings", "@xmtp/browser-sdk"],
    include: ["@xmtp/proto"],
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy#require-corp
      "Cross-Origin-Opener-Policy": "same-origin"
    }
  },
  define: {
    global: 'globalThis', // ?
  },
  resolve: {
    alias: {
      '@': '/src',
      '@lib': '/src/lib',
      '@helpers': '/src/helpers',
      '@components': '/src/components'
    }
  }
})

export default config
