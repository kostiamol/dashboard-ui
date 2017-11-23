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

  devtool: false,

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
    new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') }
		}),
   	new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      }
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },  
};
