const path = require('path');

const QlikSensePlugin = require('../');   // 'qlik-sense-webpack-plugin'
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    context: path.join(__dirname),
    entry: {
        main: ['./example-extension.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'example-extension.js'
    },
    plugins: [
        new QlikSensePlugin(),
        new ZipPlugin()
    ]
};
