/** @type {Detox.DetoxConfig} */
module.exports = {
  // ─── Test runner ────────────────────────────────────────────────────────────
  testRunner: {
    args: {
      // Detox uses its own Jest runner for E2E
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120_000, // 2 min — accounts for simulator boot time
    },
  },

  // ─── Behaviour ──────────────────────────────────────────────────────────────
  behavior: {
    init: {
      reinstallApp: true,   // Clean install before every test run
      exposeGlobals: true,
    },
    cleanup: {
      shutdownDevice: false, // Keep simulator warm between runs (faster CI)
    },
  },

  // ─── Artifacts (screenshots, videos, logs) ──────────────────────────────────
  artifacts: {
    rootDir: '.artifacts/e2e',
    plugins: {
      screenshot: {
        shouldTakeAutomaticSnapshots: true,
        takeWhen: { testFailure: true }, // Screenshot only on failure
      },
      video: { enabled: false },         // Enable in CI if you need recordings
      log: { enabled: true },
    },
  },

  // ─── Apps ───────────────────────────────────────────────────────────────────
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/heroui.app',
      build:
        'xcodebuild -workspace ios/heroui.xcworkspace -scheme heroui -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/heroui.app',
      build:
        'xcodebuild -workspace ios/heroui.xcworkspace -scheme heroui -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      testBinaryPath: 'android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      intent: {
        action: 'android.intent.action.MAIN',
        componentName: 'com.heroui/.MainActivity',
      },
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      // Android instrumentation tests always use the debug test APK,
      // even when testing a release build.
      testBinaryPath: 'android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk',
      build:
        'cd android && ./gradlew assembleRelease assembleDebugAndroidTest',
    },
  },

  // ─── Devices ────────────────────────────────────────────────────────────────
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: { type: 'iPhone 17 Pro' },
    },
    emulator: {
      type: 'android.emulator',
      device: { avdName: 'Medium_Phone' },
    },
    attached: {
      type: 'android.attached',
      device: { adbName: '.*' }, // Any attached device
    },
  },

  // ─── Configurations ─────────────────────────────────────────────────────────
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    // Android E2E always uses debug builds — assembleAndroidTest only produces
    // a debug-variant test APK. A release test APK would require additional
    // Gradle configuration and is not the standard Detox setup.
    'android.emu.release': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};
