// const { defineConfig } = require('@vue/cli-service')

const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: "./",
  // publicPath: process.env.BASE_URL,
  indexPath: "index.html", // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: (config) => {
    config.resolve.symlinks(true); // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias // 添加别名
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"));
    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    // if (IS_PROD) {
    //   config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{
    //     analyzerMode: "static",
    //   },]);
    // }
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
  },
  configureWebpack: (config) => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: IS_PROD,
    // 开启 CSS source maps?
    sourceMap: true,
    // requireModuleExtension: false,// 去掉文件名中的 .module
    loaderOptions: {},
  },
  devServer: {
    host: "0.0.0.0",
    port: 8011, // 端口号
    https: false, // https:{type:Boolean}
    // open: true, //配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: proxyList(),
  },
};

function proxyList() {
  let proxy = {};
  proxy = {
    "/apis": {
        target: ' http://111.231.60.214:48080',
      // target: 'http://793863183.e3.luyouxia.net:12182',
      // target: 'http://192.168.20.68:10030',
      // target: 'http://192.168.10.100:10190',
      // target: 'http://192.168.10.173:10030',
      // target: "http://192.168.43.28:10030",
      // target: 'http://yuzw.e3.luyouxia.net:13156',
      timeout: 1000 * 60 * 15,
      changeOrigin: true,
      // ws: true,
      pathRewrite: {
        "^/apis": "",
      },
    },
  };
  proxy = {
    ...proxy,
    // 无人机 实时视频http://192.168.10.98:19998/liveVideo/live/stream01641007744838402048/hls.m3u8
    "/liveVideo": {
      // target: 'http://192.168.10.98:19998/live/stream01641007744838402048/hls.m3u8',
      target: "http://192.168.10.98:19998",
      changeOrigin: true,
      // ws: true,
      pathRewrite: {
        "^/liveVideo": "",
      },
    },
    "/imgUrl": {
      target: "http://192.168.10.30:11886",
      // target:"http://jiamu0317.e1.luyouxia.net:23923",
      pathRewrite: { "^/imgUrl": "" },
      changeOrigin: true,
      // logLevel: "debug",
      // ws: true,
    },
    "/mapUrl": {
      target: "http://192.168.10.173:11886",
      // target: "http://793863183.e3.luyouxia.net:11201",
      pathRewrite: { "^/mapUrl": "/mapUrl" },
      changeOrigin: true,
      // logLevel: "debug",
    },
  };
  return proxy;
}
