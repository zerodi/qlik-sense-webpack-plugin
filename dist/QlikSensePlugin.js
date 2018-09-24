'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appRootDir = require('app-root-dir');

var _appRootDir2 = _interopRequireDefault(_appRootDir);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rootDir = _appRootDir2.default.get();
var pkg = require(_path2.default.resolve(rootDir, 'package.json'));

var QlikSensePlugin = function () {
    function QlikSensePlugin(options) {
        _classCallCheck(this, QlikSensePlugin);

        var defaultOptions = {
            extensionName: pkg.name,
            metadata: QlikSensePlugin.metadata()
        };

        this._options = _extends({}, defaultOptions, options);
    }

    _createClass(QlikSensePlugin, [{
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            compiler.hooks.emit.tapAsync('emit', function (compilation, callback) {
                createExtensionMetadata(compilation, _this._options);

                createWbFolder(compilation, _this._options);

                callback();
            });
        }
    }], [{
        key: 'metadata',
        value: function metadata() {
            return {
                name: pkg.name,
                description: pkg.description,
                version: pkg.version,
                author: pkg.author && (pkg.author.name || pkg.author),
                repository: pkg.repository && (pkg.repository.url || pkg.repository),
                homepage: pkg.homepage,
                type: 'visualization',
                icon: 'extension',
                preview: undefined,
                keywords: pkg.keywords && pkg.keywords.join(', '),
                license: pkg.license,
                dependencies: pkg.peerDependencies
            };
        }
    }]);

    return QlikSensePlugin;
}();

// PRIVATE


exports.default = QlikSensePlugin;
function createExtensionMetadata(compilation, options) {
    var content = JSON.stringify(options.metadata, null, 2);
    var assets = compilation.assets;


    assets[options.extensionName + '.qext'] = {
        source: function source() {
            return content;
        },
        size: function size() {
            return content.length;
        }
    };
}

function createWbFolder(compilation) {
    var assets = compilation.assets;

    var asList = Object.keys(compilation.assets).join(';\n');
    var content = asList + ';';

    assets['wbfolder.wbl'] = {
        source: function source() {
            return content;
        },
        size: function size() {
            return content.length;
        }
    };
}
module.exports = exports.default;