import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'], // Only JS entry
            refresh: true,
        }),
        vue(),
    ],
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
});
