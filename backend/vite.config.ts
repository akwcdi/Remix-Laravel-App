import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        outDir: "public/build",
        // ...
    },
    plugins: [
        react(),
        laravel({
            input: ["resources/css/app.css", "resources/ts/index.tsx"],
            refresh: true,
        }),
    ],
});
