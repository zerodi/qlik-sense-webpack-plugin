import appRootDir from 'app-root-dir';
import path from 'path';

export default class QlikSensePlugin
{
    constructor(options) {
        const rootDir = appRootDir.get();
        const pkg = require(path.resolve(rootDir, 'package.json'));

        const defaultOptions = {
            extensionName: pkg.name,
            metadata: {
                name: pkg.name,
                description: pkg.description,
                version: pkg.version,
                author: pkg.author.name || pkg.author,
                type: 'visualization',
                icon: 'extension',
                preview: undefined
            }
        };

        this._options = {...defaultOptions, ...options};
    }


    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            createExtensionMetadata(compilation, this._options);

            createWbFolder(compilation, this._options);

            callback();
        });
    }
}


// PRIVATE


function createExtensionMetadata(compilation, options) {
    const content = JSON.stringify(options.metadata, null, 2);

    compilation.assets[`${options.extensionName}.qext`] = {
        source: () => content,
        size: () => content.length
    };
}



function createWbFolder(compilation, options) {
    const content = Object.keys(compilation.assets).join(';\n') + ';';

    compilation.assets['wbfolder.wbl'] = {
        source: () => content,
        size: () => content.length
    };
}
