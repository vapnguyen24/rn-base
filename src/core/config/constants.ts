export const QUERY_STALE_TIME = 1000 * 60 * 5; // 5 minutes
export const QUERY_GC_TIME = 1000 * 60 * 10;   // 10 minutes
export const STORAGE_KEYS = {
  AUTH: 'auth-storage',
} as const;

// Keep in sync with the native app version (android/app/build.gradle & ios/heroui/Info.plist)
export const APP_VERSION = '0.0.1';

export const STORE_URLS = {
  IOS: 'https://apps.apple.com/app/idXXXXXXXXX', // Replace with real App Store ID
  ANDROID: 'https://play.google.com/store/apps/details?id=com.heroui', // Replace with real package name
} as const;
