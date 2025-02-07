// vite.config.ts
import { defineConfig } from "file:///home/ms/Development/dot/vite-admiral/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.6/node_modules/vite/dist/node/index.js";
import react from "file:///home/ms/Development/dot/vite-admiral/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_vite@5.4.11/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { VitePWA } from "file:///home/ms/Development/dot/vite-admiral/node_modules/.pnpm/vite-plugin-pwa@0.21.1_vite@5.4.11_workbox-build@7.3.0_workbox-window@7.3.0/node_modules/vite-plugin-pwa/dist/index.js";
import { sentryVitePlugin } from "file:///home/ms/Development/dot/vite-admiral/node_modules/.pnpm/@sentry+vite-plugin@3.0.0/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
var __vite_injected_original_dirname = "/home/ms/Development/dot/vite-admiral";
var vite_config_default = defineConfig({
  server: {
    port: 3e3
  },
  plugins: [
    react(),
    sentryVitePlugin({
      url: process.env.SENTRY_URL,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        clientsClaim: true,
        skipWaiting: true
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@protected": path.resolve(__vite_injected_original_dirname, "./src/app/(protected)")
    }
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("moment")) {
            return "moment";
          }
          if (id.includes("axios")) {
            return "axios";
          }
          if (id.includes("react-router-dom") || id.includes("react-router")) {
            return "@react-router";
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tcy9EZXZlbG9wbWVudC9kb3Qvdml0ZS1hZG1pcmFsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tcy9EZXZlbG9wbWVudC9kb3Qvdml0ZS1hZG1pcmFsL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21zL0RldmVsb3BtZW50L2RvdC92aXRlLWFkbWlyYWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gXCJAc2VudHJ5L3ZpdGUtcGx1Z2luXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBzZW50cnlWaXRlUGx1Z2luKHtcbiAgICAgIHVybDogcHJvY2Vzcy5lbnYuU0VOVFJZX1VSTCxcbiAgICAgIG9yZzogcHJvY2Vzcy5lbnYuU0VOVFJZX09SRyxcbiAgICAgIHByb2plY3Q6IHByb2Nlc3MuZW52LlNFTlRSWV9QUk9KRUNULFxuICAgICAgYXV0aFRva2VuOiBwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTixcbiAgICB9KSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICBpbmplY3RSZWdpc3RlcjogXCJhdXRvXCIsXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmd9XCJdLFxuICAgICAgICBjbGllbnRzQ2xhaW06IHRydWUsXG4gICAgICAgIHNraXBXYWl0aW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcImZhdmljb24uaWNvXCIsIFwiYXBwbGUtdG91Y2gtaWNvbi5wbmdcIiwgXCJtYXNrLWljb24uc3ZnXCJdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJNeSBBd2Vzb21lIEFwcFwiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIk15QXBwXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk15IEF3ZXNvbWUgQXBwIGRlc2NyaXB0aW9uXCIsXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwicHdhLTE5MngxOTIucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcInB3YS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgIFwiQHByb3RlY3RlZFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2FwcC8ocHJvdGVjdGVkKVwiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDgwMCxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJtb21lbnRcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm1vbWVudFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJheGlvc1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiYXhpb3NcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3Qtcm91dGVyLWRvbVwiKSB8fCBpZC5pbmNsdWRlcyhcInJlYWN0LXJvdXRlclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiQHJlYWN0LXJvdXRlclwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsb0JBQW9CO0FBQzlULE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsd0JBQXdCO0FBSmpDLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixpQkFBaUI7QUFBQSxNQUNmLEtBQUssUUFBUSxJQUFJO0FBQUEsTUFDakIsS0FBSyxRQUFRLElBQUk7QUFBQSxNQUNqQixTQUFTLFFBQVEsSUFBSTtBQUFBLE1BQ3JCLFdBQVcsUUFBUSxJQUFJO0FBQUEsSUFDekIsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLGdDQUFnQztBQUFBLFFBQy9DLGNBQWM7QUFBQSxRQUNkLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQSxlQUFlLENBQUMsZUFBZSx3QkFBd0IsZUFBZTtBQUFBLE1BQ3RFLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDcEMsY0FBYyxLQUFLLFFBQVEsa0NBQVcsdUJBQXVCO0FBQUEsSUFDL0Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCx1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQVk7QUFDdkIsY0FBSSxHQUFHLFNBQVMsUUFBUSxHQUFHO0FBQ3pCLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUksR0FBRyxTQUFTLE9BQU8sR0FBRztBQUN4QixtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxrQkFBa0IsS0FBSyxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQ2xFLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
