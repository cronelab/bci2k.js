import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'bci2k',
            fileName: (format) => `bci2k.${format}.js`
        },
        rollupOptions: {
            external: ['websocket'],
            output: {
                globals: {
                    websocket: 'websocket'
                },

            },
        },
    },
})