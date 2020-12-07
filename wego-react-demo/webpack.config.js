const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const QiniuPlugin = require('qiniu-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const port = 8082;


module.exports = (env, argv) => {
    const { local, proxy, dev, prod, analyzer } = env;
    console.log('local, proxy, dev, prod, analyzer: ', local, proxy, dev, prod, analyzer);
    const { mode } = argv;

    const BUILD_PATH = path.resolve(__dirname, prod ? 'build' : 'jsxdst');
    const HTML_PATH = path.resolve(__dirname, prod ? 'index.prod.html' : 'index.html');

    let config = {
        mode,
        // bail: true, // 出错则停止编译
        entry: {
            index: './index.local.js',
        },
        output: {
            path: BUILD_PATH,
            hashDigestLength: 8, // hash、chunkhash、contenthash长度
            filename: prod ? '[name].[contenthash].js' : '[name].js',
            chunkFilename: prod ? '[name].[contenthash].js' : '[name].js',
            publicPath: local ? '' : prod ? '//xcimg.szwego.com/' : 'jsxdst/',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                },
                {
                    test: /\.(c|le)ss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true
                            },
                        }
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            limit: 1024 * 10,
                        },
                    },
                },
            ],
        },
        plugins: [
            !local && new CleanPlugin(),
            new HtmlPlugin({
                template: HTML_PATH,
            }),
            prod &&
            new QiniuPlugin({
                ACCESS_KEY: '23WtVnKHrj37_NmValDCRH1JDiGncma4dzDeWl3H',
                SECRET_KEY: 'Yem50dRHdfSGAbEaH9DogRxc6-V8EEBxnkhCANVN',
                bucket: 'lookbook-server-img',
                path: '',
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 200, // Must be greater than or equal to one
                minChunkSize: 10240,
            }),
            local &&
            new CopyWebpackPlugin([
                {
                    from: path.resolve('./js'),
                    ignore: ['.*'],
                },
            ]),
            // new BundleAnalyzerPlugin({
            //     analyzerHost: '127.0.0.1',
            //     analyzerPort: 7878, // 运行后的端口号
            // }),
        ].filter(Boolean),
        resolve: {
            extensions: ['.jsx', '.js', '.json', '.css', '.less'],
            alias: {
                '@images': path.resolve(__dirname, 'src/images'),
            },
        },

        // 模式二
        optimization: {
            runtimeChunk: !dev && 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: 10,
                minSize: 30000,
                maxSize: 0,
                cacheGroups: {
                    commons: {
                        name(module) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            const names = packageName.split('@');
                            return `wegooo~${names[names.length - 1]}`;
                        },
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    };

    if (local) {
        const devServer = proxy && {
            // contentBase: false,
            port,
            proxy: {
                '/abcd': {
                    // target: 'https://www.wegoab.com', // test
                    target: 'https://www.micbosscloud.com/', // pre prod
                    // target: 'https://www.szwego.com', // prod
                    secure: false, // 支持https域名
                    // logLevel: 'info',
                    changeOrigin: true,
                    // onProxyReq(proxyReq, req, res) {
                    //     let match = devServer.proxy['/'].target.match(/.*\:\/\/([^\/]*).*/);
                    //     proxyReq.setHeader('Host', match[1]);
                    // },
                },
            },
        };
        config = {
            ...config,
            devServer: {
                // contentBase: path.join(__dirname, '..'),
                publicPath: '/', // 静态资源目录
                host: '0.0.0.0', // 支持外网访问 default: localhost
                useLocalIp: true, // 使用本机ip访问
                open: true,
                openPage: '#/',
                ...devServer,
            },
        };
    }

    if (!prod) {
        config = {
            ...config,
            devtool: 'eval-source-map',
            // devtool: 'cheap-module-eval-source-map',
        };
    }


    return config;
};
