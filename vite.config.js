import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({

    build: {
        chunkSizeWarningLimit: 2000,
        assetsInlineLimit: '2048',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {

                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }
})