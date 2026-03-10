const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

// Lazy-require withStorybook ONLY when Storybook is enabled.
// @storybook/react-native/metro/withStorybook synchronously require()s the
// ESM-only `storybook` package at module load time, which crashes Metro
// in normal (non-Storybook) builds — including E2E and production builds.
const isStorybookEnabled = process.env.STORYBOOK_ENABLED === 'true';

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

let storybookConfig = config;
if (isStorybookEnabled) {
  const { withStorybook } = require('@storybook/react-native/metro/withStorybook');
  storybookConfig = withStorybook(config, {
    enabled: true,
    configPath: path.resolve(__dirname, './.rnstorybook'),
  });
}

// withUniwindConfig MUST be the outermost wrapper
module.exports = withUniwindConfig(storybookConfig, {
  cssEntryFile: './global.css',
});
