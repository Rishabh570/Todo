module.exports = {
  entry: './js/app.js',

  output: {
    filename: './js/bundle.js'
  },

  module: {
    loaders: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
       }
     ]
  }
};
