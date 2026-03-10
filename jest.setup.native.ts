/**
 * jest.setup.native.ts — runs BEFORE the Jest test framework is installed.
 *
 * Responsibilities:
 *  - Polyfill globals that React Native expects in a jsdom/node environment
 *  - Mock native modules that cannot be auto-mocked (no JS implementation)
 *
 * Rule of thumb:
 *  - Keep this file FAST — no imports with side-effects
 *  - Prefer __mocks__ files for per-module mocks
 */

import 'react-native-gesture-handler/jestSetup';

// ─── react-native-worklets ────────────────────────────────────────────────────
// react-native-worklets instantiates a native Turbo Module at module-level.
// Must be mocked BEFORE react-native-reanimated (which imports worklets).
jest.mock('react-native-worklets', () => ({
  makeShareable: jest.fn((v: unknown) => v),
  makeShareableCloneRecursive: jest.fn((v: unknown) => v),
  runOnUI: jest.fn((fn: (...args: unknown[]) => unknown) => fn),
  runOnJS: jest.fn((fn: (...args: unknown[]) => unknown) => fn),
  isWorkletFunction: jest.fn(() => false),
  executeOnUIRuntimeSync: jest.fn(),
  createWorkletRuntime: jest.fn(),
  WorkletsModule: {},
}));

// ─── react-native-reanimated ──────────────────────────────────────────────────
// Uses __mocks__/react-native-reanimated.js — a self-contained mock that has
// zero imports from the real Reanimated source. The built-in mock.js pulls in
// the full native source chain (→ worklets Turbo Module crash), so we can't use it.
jest.mock('react-native-reanimated');

// ─── @gorhom/bottom-sheet ─────────────────────────────────────────────────────
// heroui-native imports @gorhom/bottom-sheet which re-imports Reanimated source.
// Use __mocks__/@gorhom/bottom-sheet.js to break the chain entirely.
jest.mock('@gorhom/bottom-sheet');

// ─── react-native-mmkv ────────────────────────────────────────────────────────
// MMKV v4 depends on react-native-nitro-modules, which calls
// TurboModuleRegistry.getEnforcing('NitroModules') at import time.
// That call crashes in Jest's Node.js environment before any test-detection
// logic can run. We must mock the entire package with a pure in-memory store.
jest.mock('react-native-mmkv', () => {
  function createMMKVMock() {
    const store = new Map<string, string | number | boolean>();

    return {
      set: (key: string, value: string | number | boolean) => store.set(key, value),
      getString: (key: string) => {
        const v = store.get(key);
        return typeof v === 'string' ? v : undefined;
      },
      getNumber: (key: string) => {
        const v = store.get(key);
        return typeof v === 'number' ? v : undefined;
      },
      getBoolean: (key: string) => {
        const v = store.get(key);
        return typeof v === 'boolean' ? v : undefined;
      },
      contains: (key: string) => store.has(key),
      remove: (key: string) => store.delete(key),
      delete: (key: string) => store.delete(key),
      clearAll: () => store.clear(),
      getAllKeys: () => Array.from(store.keys()),
      trim: () => {},
      addOnValueChangedListener: () => ({ remove: () => {} }),
    };
  }

  return {
    createMMKV: jest.fn(() => createMMKVMock()),
    useMMKV: jest.fn(() => createMMKVMock()),
    useMMKVString: jest.fn(() => [undefined, jest.fn()]),
    useMMKVNumber: jest.fn(() => [undefined, jest.fn()]),
    useMMKVBoolean: jest.fn(() => [undefined, jest.fn()]),
    useMMKVObject: jest.fn(() => [undefined, jest.fn()]),
    useMMKVListener: jest.fn(),
  };
});

// ─── react-native-safe-area-context ───────────────────────────────────────────
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
    SafeAreaView: ({ children, style }: { children: React.ReactNode; style?: object }) =>
      React.createElement(View, { style }, children),
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    SafeAreaInsetsContext: { Consumer: ({ children }: any) => children(insets) },
    initialWindowMetrics: { insets, frame },
  };
});

// ─── @react-navigation ────────────────────────────────────────────────────────
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      replace: jest.fn(),
      push: jest.fn(),
      reset: jest.fn(),
    }),
    useRoute: () => ({ params: {} }),
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn(() => true),
  };
});

// ─── react-native-screens ─────────────────────────────────────────────────────
jest.mock('react-native-screens', () => {
  const actual = jest.requireActual('react-native-screens');
  return { ...actual, enableScreens: jest.fn() };
});

// ─── i18next / react-i18next ──────────────────────────────────────────────────
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,   // Returns the key as-is → assertions stay i18n-agnostic
    i18n: { language: 'en', changeLanguage: jest.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: jest.fn() },
  Trans: ({ children }: { children: React.ReactNode }) => children,
}));

// ─── @tanstack/react-query ────────────────────────────────────────────────────
// Not mocked globally — use the real QueryClient in component tests for
// accurate behaviour; only stub at the hook level when needed.

// ─── Global fetch polyfill (for MSW) ─────────────────────────────────────────
// MSW v2 requires a global fetch. Node 18+ has it natively; add a polyfill for
// older Node versions used in CI.
if (!global.fetch) {
  const nodeFetch = require('node-fetch');
  global.fetch = nodeFetch;
  global.Headers = nodeFetch.Headers;
  global.Request = nodeFetch.Request;
  global.Response = nodeFetch.Response;
}
