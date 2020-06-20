const path = require('path');

module.exports ={
  mode: 'development',
  entry: {
    app: './src/app.js',
    'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
  },
  output:{
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: 'dist'
  }
}