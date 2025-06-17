import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'vapngbase',
  slug: 'vapngbase',
  version: '1.0.0',
  scheme: 'vapngbase',
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
  },
  plugins: [
    ['expo-router'],
    [
      'expo-dev-launcher',
      {
        launchMode: 'most-recent',
      },
    ],
    'expo-font',
    "expo-localization",
    [
      'react-native-keys',
      {
        android: {
          defaultKeyFile: './env/dev.json',
        },
        ios: {
          defaultKeyFile: './env/dev.json',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.vapng.rnbase',
  },
  android: {
    package: 'com.vapng.rnbase',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
});

// deeplink
// npx uri-scheme open thinkiq:// --ios
// npx uri-scheme open thinkiq://somepath/details --ios