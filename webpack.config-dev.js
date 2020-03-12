const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: __dirname+'/dist',
    filename: 'widget-dev.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.html$/i, use: 'html-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
