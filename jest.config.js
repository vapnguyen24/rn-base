/** @type {import('jest').Config} */
module.exports = {
  // ─── Preset ───────────────────────────────────────────────────────────────
  preset: 'react-native',

  // ─── TypeScript ───────────────────────────────────────────────────────────
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },

  // ─── Module resolution (mirrors tsconfig.json paths) ──────────────────────
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    // MSW v2 — msw/node marks react-native condition as null, but ships a CJS
    // build at lib/node/index.js. Map it directly to avoid condition resolution.
    'msw/node': '<rootDir>/node_modules/msw/lib/node/index.js',
    // heroui-native ships React Native components backed by Reanimated/Nitro
    // native modules. Map all subpaths to a single lightweight stub so tests
    // never try to initialise native bindings.
    '^heroui-native(.*)$': '<rootDir>/__mocks__/heroui-native/index.js',
    // Static assets
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // ─── Setup files ──────────────────────────────────────────────────────────
  // Runs BEFORE the test framework is installed — polyfills, env globals
  setupFiles: ['<rootDir>/jest.setup.native.ts'],
  // Runs AFTER the test framework is installed — matchers, MSW lifecycle, etc.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // ─── Coverage ─────────────────────────────────────────────────────────────
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/__mocks__/**',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70, statements: 70 },
  },
  coverageReporters: ['text', 'lcov', 'html'],

  // ─── Test file detection ───────────────────────────────────────────────────
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
  ],
  // E2E lives in /e2e/ and is run by Detox via its own Jest runner — exclude here
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
    '/e2e/',
    '/.storybook/',
  ],

  // ─── Module file extensions ───────────────────────────────────────────────
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // ─── Transform ignore ─────────────────────────────────────────────────────
  // Transpile any native/navigation library that ships untranspiled source
  transformIgnorePatterns: [
    'node_modules/(?!' +
      [
        'react-native',
        '@react-native',
        '@react-navigation',
        'react-native-gesture-handler',
        'react-native-reanimated',
        'react-native-screens',
        'react-native-safe-area-context',
        'react-native-mmkv',
        'react-native-svg',
        'heroui-native',
        'uniwind',
        'tailwind-variants',
        // MSW v2 dependency that ships ESM-only
        'until-async',
      ].join('|') +
      ')',
  ],

  // ─── Misc ─────────────────────────────────────────────────────────────────
  clearMocks: true,    // Reset mock state between tests (no manual jest.clearAllMocks())
  restoreMocks: true,  // Restore spy/stub originals between tests
  verbose: true,
  testTimeout: 10_000, // 10 s hard limit — catches silently hanging async tests
};

