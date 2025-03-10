const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        assert: require.resolve("assert/"),
        vm: require.resolve("vm-browserify")
      };
      return webpackConfig;
    }
  }
};
