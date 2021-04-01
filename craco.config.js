const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      baseUI: resolve('src/baseUI')
    },
    devServer: {
      proxy: {
        '/': 'http://1.15.227.196:3000',
      },
    },
  },
};
