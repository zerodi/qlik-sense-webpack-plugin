import appRootDir from 'app-root-dir';
import path from 'path';

const rootDir = appRootDir.get();
const pkg = require(path.resolve(rootDir, 'package.json'));

export default class QlikSensePlugin {
    constructor(options) {
        const defaultOptions = {
            extensionName: pkg.name,
            metadata: QlikSensePlugin.metadata()
        };

        this._options = { ...defaultOptions, ...options };
    }


    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            createExtensionMetadata(compilation, this._options);

            createWbFolder(compilation, this._options);

            callback();
        });
    }


    static metadata() {
        return {
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
            author: pkg.author && (pkg.author.name || pkg.author),
            respository: pkg.repository && (pkg.repository.url || pkg.repository),
            homepage: pkg.homepage,
            type: 'visualization',
            icon: 'extension',
            preview: undefined,
            keywords: pkg.keywords && pkg.keywords.join(),
            dependencies: pkg.peerDependencies
        };
    }
}


// PRIVATE


function createExtensionMetadata(compilation, options) {
    const content = JSON.stringify(options.metadata, null, 2);
    const assets = compilation.assets;

    assets[`${options.extensionName}.qext`] = {
        source: () => content,
        size: () => content.length
    };
}


function createWbFolder(compilation) {
    const assets = compilation.assets;
    const asList = Object.keys(compilation.assets).join(';\n');
    const content = `${asList};`;

    assets['wbfolder.wbl'] = {
        source: () => content,
        size: () => content.length
    };
}
