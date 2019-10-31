const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/public/components/App.jsx'),
  output: {
    path: path.resolve(__dirname, 'client/public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
        test: /\.less$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: [
          'css-loader',
          {
            loader: 'less-loader',
            options: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true
          }
        }
      ]
     }
    ]
  }
};
