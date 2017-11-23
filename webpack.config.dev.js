const webpack = require('webpack');
const path = require('path');

const port = process.env.PORT || 8082;
const publicPath = `http://localhost:${port}/`;

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, './src/index.jsx')
  ],

  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath,
  },

  devtool: "inline-sourcemap",

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000 // Convert images < 10k to base64 strings
          },
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    port,
    publicPath,
    compress: true,
    stats: { chunks: false },
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },    
    contentBase: path.resolve(__dirname, ''),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },
    historyApiFallback: {
        verbose: true,
        disableDotRule: true,
    },
  },
};
