const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [new CompressionPlugin()],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: "all",
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 256000,
      maxAssetSize: 256000,
    },
  },
  outputDir: "../../public/assets/cms",
  publicPath: process.env.NODE_ENV === "production" ? "/assets/cms/" : "/cms",
  indexPath:
    process.env.NODE_ENV === "production"
      ? "../../../resources/views/pages/cms.blade.php"
      : "index.html",
};
