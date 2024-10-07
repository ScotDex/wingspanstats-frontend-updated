import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('custom-') // Example for custom elements if used in the future
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Aliasing the 'src' folder
      'vue$': 'vue/dist/vue.esm-bundler.js', // Ensure correct Vue build is used
    },
    extensions: ['.js', '.vue', '.json'], // Standard extensions to resolve
  },
  server: {
    open: true, // Auto open the browser on server start
    port: 3000, // Can be customized
  },
  build: {
    outDir: 'dest', // Outputs final files into 'dest' folder
    assetsDir: '', // All assets (CSS, images) will be directly under 'dest'
    emptyOutDir: true, // Clean 'dest' folder before each build
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'src/js/app.js'), // Main entry file for the app
      },
      output: {
        entryFileNames: 'js/[name].bundle.js', // Output JS files
        chunkFileNames: 'js/[name].chunk.js', // Output chunked JS files
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? '')) {
            return 'css/[name][extname]'; // Place CSS files in the 'css' folder
          }
          if (/\.(png|jpe?g|svg|gif)$/.test(name ?? '')) {
            return 'images/[name][extname]'; // Place images in the 'images' folder
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? '')) {
            return 'fonts/[name][extname]'; // Place fonts in the 'fonts' folder
          }
          return '[name][extname]'; // Default case for other assets
        },
      },
    },
  },
});
