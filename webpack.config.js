const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const modes = {
  dev: 'development',
  prod: 'production',
};

const isProd = process.env.BUILD_TYPE === modes.prod;
const isDev = !isProd;

const filename = (name, ext) => (isDev ? `${name}.${ext}` : `${name}.[hash].${ext}`);

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  distAssets: path.resolve(__dirname, 'dist/assets'),
  assets: path.resolve(__dirname, 'src/assets'),
};

const entry = {
  index: [`${PATHS.src}/index.ts`],
  test: [`${PATHS.src}/templates/test.ts`],
};

const pages = [
  {
    chunks: ['index'],
    page: 'index.html',
    template: `${PATHS.src}/index.html`,
  },
  {
    chunks: ['test'],
    page: 'test.html',
    template: `${PATHS.src}/templates/test.html`,
  },
];

const htmlPlugins = pages.map((page) => {
  return new HtmlWebpackPlugin({
    inject: true,
    favicon: `${PATHS.assets}/icons/favicon-16x16.png`,
    template: page.template,
    filename: page.page,
    chunks: [...page.chunks],
    minify: {
      removeComments: isProd,
      collapseWhitespace: isProd,
    },
  });
});

let optimization = {
  splitChunks: {
    chunks: 'all',
  },
};

if (isProd) {
  optimization = {
    ...optimization,
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}

module.exports = {
  mode: modes.dev,
  entry: {
    ...entry,
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: filename('[name]', 'js'),
    publicPath: '',
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    static: `${PATHS.src}`,
    hot: isDev,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg|mp3|svg)$/i, type: 'asset' },
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    modules: [PATHS.src, 'node_modules'],
    extensions: ['.js', '.json', '.ts'],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.assets}`,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    ...htmlPlugins,
    new miniCss({ filename: filename('[name]', 'css') }),
  ],
  optimization,
};
