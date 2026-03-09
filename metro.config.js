const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {
  // Force cache bust when babel.config.js changes (worklets plugin)
  cacheVersion: 'worklets-v2',
  resolver: {
    extraNodeModules: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
    },
  },
});

// withUniwindConfig MUST be the outermost wrapper
module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
});
