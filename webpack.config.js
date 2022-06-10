'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * Manage Project Configuration
 */
const configuration = {
  project: [
    // Project themes
    {
      type: 'theme',
      name: 'openclass-bootstrap',
      path: './',
    },
  ],
  common: {
    paths: {
      index: './src/index.js',
      dest: './dist/',
    },
    filename: {
      js: 'js/[name].js',
      css: 'css/[name].css',
    },
  },
};

/**
 * Object to create webpack configuration
 */
const webpack = {
  dev: null,
  watch: null,

  /**
   * Default configuration
   */
  config: {
    resolve: {
      symlinks: false,
    },
    watch: false,
    watchOptions: {
      ignored: 'node_modules',
    },
    output: {
      path: '',
      filename: configuration.common.filename.js,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.scss/,
          exclude: /(node_modules|bower_components)/,
          use: '',
        },
        {
          test: /\.css$/,
          use: '',
        },
        {
          test: /\.(svg|ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        },
      ],
    },
  },

  /**
   * Initialize configuration
   * @param {Object} parameters
   */
  init(parameters) {
    this.dev = parameters.mode === 'development';
    this.watch = !!parameters.watch;
    this.getEnvConfiguration();
    this.getThemesAndModules();
  },

  /**
   * Add properties depending of the environment configuration
   */
  getEnvConfiguration() {
    if (!this.dev) {
      this.style.addProdLoader();
      this.optimization = {
        minimize: true,
      };
    }

    this.config.watch = this.watch;
    this.config.devtool = this.dev ? 'eval-cheap-source-map' : false;
    this.config.module.rules[1].use = [...this.style.loaders, 'sass-loader'];
    this.config.module.rules[2].use = [...this.style.loaders];
  },

  /**
   * Generate configuration for each theme and module.
   */
  getThemesAndModules() {
    this.finalConfig = [];
    let tmpConfig = {};

    configuration.project.forEach((element) => {
      tmpConfig = Object.assign({}, webpack.config);
      tmpConfig.name = element.name;
      tmpConfig.entry = {};
      tmpConfig.entry[element.name] = element.path + configuration.common.paths.index;
      tmpConfig.output = {
        path: path.resolve(element.path + configuration.common.paths.dest),
        filename: configuration.common.filename.js,
      };

      tmpConfig.plugins = [];

      // Specific configuration per theme or module
      // Themes
      if (element.type === 'theme') {
        tmpConfig.plugins = [...tmpConfig.plugins,
          // Add style plugin
          new MiniCssExtractPlugin({
            filename: configuration.common.filename.css,
          }),

          // Comment these copy steps since there are no files to copy yet
          // // Copy images
          // new CopyPlugin({
          //   patterns: [
          //     {
          //       from: './src/img/',
          //       to: 'img/',
          //     },
          //   ],
          // }),
          //
          // // Copy fonts
          // new CopyPlugin({
          //   patterns: [
          //     {
          //       from: './src/fonts/',
          //       to: 'fonts/',
          //     },
          //   ],
          // }),
        ];
      }

      if (tmpConfig.plugins.length === 0) delete tmpConfig.plugins;
      this.finalConfig.push(tmpConfig);
    });
  },

  /**
   * Manage style loaders
   */
  style: {
    loaders: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: './../',
        },
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'group-css-media-queries-loader',
        options: {sourceMap: false},
      },
    ],

    /**
     * Add autoprefixer with postcss-loader
     */
    addProdLoader() {
      this.loaders.push({
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: ['autoprefixer'],
          },
        },
      });
    },
  },
};

module.exports = (env, parameters) => {
  webpack.init(parameters);
  return webpack.finalConfig;
};
