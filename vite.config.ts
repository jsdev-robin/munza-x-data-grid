import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    dts({
      tsconfigPath: './tsconfig.app.json',
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: ['src/index.js'],
      formats: ['es', 'cjs'],
      fileName: (format) => `munza-x-data-grid.${format}.js`,
      cssFileName: 'style',
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
