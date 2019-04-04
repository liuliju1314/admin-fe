const path = require('path')
function resolve(dir) {
    return path.join(__dirname, './', dir)
}
module.exports = {
    // 基本路径
    baseUrl: '/',

    // 输出文件目录
    outputDir: 'dist',

    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // webpack配置
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    configureWebpack: () => { },

    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                data: `@import "@/assets/css/style.less";`
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },

    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,

    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            "/api/rule": {
                target: "http://47.107.91.58:28199/", // 设置你调用的接口域名和端口号
                changeOrigin: true // 跨域
            },
            // "/api": {
            //     target: "http://47.107.91.58:11021/", // 设置你调用的接口域名和端口号
            //     changeOrigin: true // 跨域
            // },
            "/api": {
                target: "http://10.27.29.84:11021/", // 设置你调用的接口域名和端口号
                changeOrigin: true // 跨域
            },

        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/css/style.less')]
        }
    }
}
