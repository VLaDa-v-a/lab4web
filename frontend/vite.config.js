import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "./",
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: "../src/main/webapp",
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: "static/js/[name].js",
                chunkFileNames: "static/js/[name].js",
                assetFileNames: "static/[ext]/[name].[ext]",
            },
        },
    },
});
