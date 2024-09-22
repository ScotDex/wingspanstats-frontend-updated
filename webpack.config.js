const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Updated import for CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader'); // Updated import for VueLoaderPlugin
const glob = require('glob');

const oldexports = {
  mode: process.env.NODE_ENV || 'development', // Default to development if not set
  entry: {
    app: './src/js/app.js',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dest'),
  },
  externals: {
    axios: 'axios',
    localforage: 'localforage',
    moment: 'moment',
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
  },
};

// Updated and confirmed working
const extractVueSCSS = new MiniCssExtractPlugin({
  filename: 'css/vue.css',
});

// Data
const newexports = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'dest/css/vue*',
        'dest/images',
        'dest/js',
      ],
    }),
    new VueLoaderPlugin(), // For Vue 3
    extractVueSCSS,
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, './src/sass/_inject.scss'),
            },
          },
        ],
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: '/images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: '/fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js', // Specific for Vue 3
    },
    extensions: ['.js', '.vue', '.json'],
  },
};

// Merge old and new exports
const result = {};
Object.assign(result, oldexports);
Object.assign(result, newexports);

console.log(result);

module.exports = result;

