/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve("src", "components/index.ts"),
      name: "admiral",
      fileName: (format) => `admiral.${format}.tsx`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "antd"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__test__/setup.ts",
  },
});
