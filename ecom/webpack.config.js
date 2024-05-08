const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  // Заменяем в нашей функции style-loader на mini-css-extract-plugin
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  entry: path.join(srcPath, 'index.tsx'),
  output: {
    path: buildPath,

    filename: 'bundle.js',
  },
  target: !isProd ? 'web' : 'browserslist',
  plugins: [
    new HtmlWebpackPlugin({
      //   template: path.join(srcPath, 'index.html'),
      template: path.resolve(__dirname, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    //Добавим плагин в plugins
    isProd &&
      new MiniCssExtractPlugin({
        // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
        filename: '[name]-[hash].css',
      }),
    new TsCheckerPlugin(),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },

      {
        test: /\.(png|svg|jpg|jpeg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    // теперь при импорте эти расширения файлов можно не указывать
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      '@components': path.join(srcPath, 'App/components'),
      '@config': path.join(srcPath, 'config'),
      '@styles': path.join(srcPath, 'styles'),
      '@stores': path.join(srcPath, 'stores'),
      '@pages': path.join(srcPath, 'App/pages'),
      '@api': path.join(srcPath, 'api'),
      '@assets': path.join(srcPath, 'assets'),
    },
  },

  devServer: {
    host: '127.0.0.1', // хост нашего сервера
    port: 9000, // порт, по которому к нему можно обращаться
    hot: true,
    historyApiFallback: true,
  },
};
