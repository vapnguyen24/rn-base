module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    'transform-inline-environment-variables',
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@core': './src/core',
          '@features': './src/features',
          '@shared': './src/shared',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
