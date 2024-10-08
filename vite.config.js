import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue$': 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.js', '.vue', '.json'],
  },
  server: {
    open: true,
    port: 5500,
  },
  build: {
    outDir: 'dest',
    assetsDir: '',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'src/js/app.js'),
      },
      output: {
        entryFileNames: 'js/[name].bundle.js',
        chunkFileNames: 'js/[name].chunk.js',
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? '')) {
            return 'css/[name][extname]';
          }
          if (/\.(png|jpe?g|svg|gif)$/.test(name ?? '')) {
            return 'images/[name][extname]';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? '')) {
            return 'fonts/[name][extname]';
          }
          return '[name][extname]';
        },
      },
    },
  },
  // Add post-build hook to copy PHP/HTML files
  buildEnd() {
    copySync('src/php', 'dest/php'); // Adjust paths as necessary
    copySync('src/html', 'dest/html'); // Copy any static HTML files
  },
});
