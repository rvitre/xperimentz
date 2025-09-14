import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    // React Router plugin breaks in Vitest; skip it in test mode.
    mode === "test" ? undefined : reactRouter(),
    tsconfigPaths(),
  ].filter(Boolean),
  test: {
    environment: "happy-dom",
    setupFiles: ["app/test/setup.ts"],
    globals: true,
    css: true,
  },
}));
