import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "src/lib/models/**",
        "src/lib/controllers/**",
        "src/lib/stores/**",
        "src/lib/tools.ts",
        "src/app/api/**",
        "src/middleware.ts",
      ],
      exclude: ["src/lib/FirestoreConn.ts", "src/lib/CloudinaryConn.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
