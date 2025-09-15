import { defineConfig } from 'vite'

export default defineConfig({
    root: 'public',
    server: {
        open: (process.env.IS_CONTAINER !== "TRUE"),
        hmr: true,
        host: true,
        port: 5173
    }
})
