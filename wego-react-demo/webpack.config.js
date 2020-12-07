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
    const HTML_PATH = path.resolve(__dirname, prod ? 'index.html' : 'index.html');


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
            publicPath: local ? '' : prod ? 'https://xcimg.szwego.com/' : 'jsxdst/',
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
                        // prod ? MiniCssPlugin.loader : 'style-loader',
                        'style-loader',
                        'css-loader',
                        'less-loader',
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
                '@weui': path.resolve(__dirname, 'src/components/weui'),
                '@native': path.resolve(__dirname, 'src/components/native'),
                '@hoc': path.resolve(__dirname, 'src/components/hoc'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@image': path.resolve(__dirname, 'src/image'),
                '@routes': path.resolve(__dirname, 'src/routes'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@constants': path.resolve(__dirname, 'src/constants'),
                '@api': path.resolve(__dirname, 'src/api'),
                '@stores': path.resolve(__dirname, 'src/stores'),
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
                            return `wego~${names[names.length - 1]}`;
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
            contentBase: false,
            port,
            proxy: {
                '/': {
                    // target: 'https://www.wemicroboss.com', // dev
                    // target: 'http://129.204.177.247:10013/', // dev
                    // target: 'https://www.wegoab.com', // test
                    // target: 'http://106.52.144.24:20080/', // test
                    // target: 'http://134.175.224.99:10013', // test
                    target: 'https://www.micbosscloud.com/', // pre prod
                    // target: 'http://119.29.115.172:20080', // pre prod
                    // target: 'http://119.29.115.172:21080', // ux
                    // target: 'https://www.szwego.com', // prod
                    // target: 'http://localhost:8080', // dev
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
                // contentBase: '', // 本地服务开启目录 default: cwd
                contentBase: path.join(__dirname, '..'),
                publicPath: '/static/', // 静态资源目录
                compress: true, // gzip
                // historyApiFallback: true,
                noInfo: false,
                https: false, // 本地地址是否使用https
                host: '0.0.0.0', // 支持外网访问 default: localhost
                useLocalIp: true, // 使用本机ip访问
                port: 8080,
                open: true,
                openPage: 'static/index.html',
                hot: true,
                stats: {
                    assets: true,
                    chunks: false,
                    colors: true,
                    version: false,
                    hash: true,
                    timings: true,
                    chunkModules: false,
                    children: false,
                    modules: false,
                },
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
