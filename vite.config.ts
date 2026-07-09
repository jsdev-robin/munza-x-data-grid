import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'path';
import copyPkg, { type CopyOptions } from 'rollup-plugin-copy';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';

const copy = copyPkg as unknown as (options: CopyOptions) => Plugin;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss({
      optimize: true,
    }),
    dts({
      tsconfigPath: './tsconfig.app.json',
    }),
    {
      ...copy({
        targets: [{ src: 'README.md', dest: 'dist' }],
        hook: 'writeBundle',
      }),
      apply: 'build',
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/package/index.tsx'),
      name: 'munza-x-data-grid',
      fileName: 'data-grid',
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
