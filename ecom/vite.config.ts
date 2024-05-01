import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/App/components'),
      '@pages': path.resolve(__dirname, './src/App/pages'),
      '@api': path.resolve(__dirname, './src/api'),
      '@stores': path.resolve(__dirname, './src/stores'),
    },
  },
  plugins: [react()],
});

// import tsconfig from './tsconfig.json';

// const SRC_PATH = path.resolve(__dirname, 'src');

// const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
//   const webpackConfigAliases: Record<string, string> = {};

//   Object.entries(paths).forEach(([alias, paths]) => {
//     const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

//     webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
//   });

//   return webpackConfigAliases;
// };

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
//   },
// });
