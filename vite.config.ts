// import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
// import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // babel({ presets: [reactCompilerPreset()] }),
    dts({
      tsconfigPath: './tsconfig.app.json',
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'munza-x-data-grid',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
