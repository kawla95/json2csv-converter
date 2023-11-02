const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vue2-json2csv'], // Add your specific package name if needed
  configureWebpack: {
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify/browser'),
      },
    },
  },
});
