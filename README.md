# qlik-sense-webpack-plugin

Webpack Plugin for Qlik Sense Extensions

> Automates the creation of Qlik Senser Extension metedata files .qext and wbfolder.wbl

## Usage
```js
const path = require('path');

const QlikSensePlugin = require('qlik-sense-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    context: path.join(__dirname),
    entry: {
        main: ['./my-extension.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'my-extension.js'
    },
    plugins: [
        new QlikSensePlugin(),
        new ZipPlugin({
            filename: 'my-extension.zip'
        })
    ]
};
```

## Install
```shell
npm install qlik-sense-webpack-plugin --save-dev
```

## Options
