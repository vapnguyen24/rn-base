# HeroUI — React Native Starter

A production-ready React Native boilerplate built with **Clean Architecture**, **HeroUI Native**, and a modern toolchain. Supports iOS and Android.

---

## Tech Stack

| Layer | Library |
|---|---|
| UI Components | [HeroUI Native](https://heroui-native.com) |
| Styling | Tailwind CSS via [Uniwind](https://github.com/WraithWinterly/uniwind) |
| Navigation | React Navigation (Native Stack + Bottom Tabs) |
| Server State | TanStack Query |
| Client State | Zustand |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Storage | react-native-mmkv (encrypted) |
| Animations | React Native Reanimated |
| i18n | i18next (English, Vietnamese) |
| Testing | Jest, React Testing Library, Detox (E2E) |
| API Mocking | MSW v2 |
| Component Dev | Storybook |
| CI/CD | GitHub Actions + Fastlane |

---

## Project Structure

```
heroui/
├── src/
│   ├── core/               # App-wide infrastructure
│   │   ├── api/            # Axios instance, type definitions, MSW mock handlers
│   │   ├── config/         # Environment config & constants
│   │   ├── di/             # Dependency injection factories
│   │   ├── i18n/           # i18next setup & locale files (en, vi)
│   │   ├── native/         # Native module wrappers
│   │   ├── query/          # TanStack Query client
│   │   └── storage/        # Storage abstraction (MMKV implementation)
│   │
│   ├── features/           # Feature modules (Clean Architecture)
│   │   ├── auth/           # Authentication
│   │   │   ├── data/       # API datasources, DTOs, mappers, repository impl
│   │   │   ├── domain/     # Entities, repository interfaces, use cases, errors
│   │   │   └── presentation/ # Screens, hooks, form schemas, Zustand store
│   │   ├── home/           # Home feature
│   │   └── main/           # Main tab area (Home, Explore, Notifications, Profile)
│   │
│   ├── navigation/         # Navigation setup
│   │   ├── root.navigator.tsx    # Auth/Main flow switcher
│   │   ├── auth.navigator.tsx    # Auth stack
│   │   ├── main.navigator.tsx    # Bottom tab navigator
│   │   ├── navigation.service.ts # Ref-based imperative navigation
│   │   └── navigation.types.ts   # Route param types
│   │
│   └── shared/             # Cross-feature shared code
│       ├── components/     # Reusable UI components (form fields, buttons, date picker, etc.)
│       ├── hooks/           # Custom hooks (useDebounce, useForceUpdate, useZodForm)
│       ├── types/           # Common TypeScript types
│       └── utils/           # Date utilities, test utilities
│
├── e2e/                    # Detox end-to-end tests
├── docs/                   # CI/CD and Fastlane documentation
├── .github/workflows/      # GitHub Actions (test, deploy, commitlint)
├── android/                # Android native code
├── ios/                    # iOS native code
├── App.tsx                 # Root component
└── index.js                # Entry point
└── global.css              # Theme configuration
```

### Architecture Pattern

Each feature follows **Clean Architecture** with three layers:

- **`data/`** — API calls, DTOs, mappers, repository implementations
- **`domain/`** — Entities, repository interfaces, use cases, error types (no framework dependencies)
- **`presentation/`** — Screens, hooks, form schemas, local state (Zustand stores)

### Path Aliases

| Alias | Resolves to |
|---|---|
| `@core/*` | `src/core/*` |
| `@features/*` | `src/features/*` |
| `@shared/*` | `src/shared/*` |
| `@navigation/*` | `src/navigation/*` |

---

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- Ruby (for CocoaPods/Fastlane)
- Xcode (iOS) / Android Studio (Android)

Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

### Install Dependencies

```sh
npm install
bundle install          # Install CocoaPods & Fastlane
bundle exec pod install # iOS native deps
```

### Environment Setup

Copy and configure your environment file:

```sh
cp env.example .env
```

Available variables: `API_URL`, `GOOGLE_MAPS_API_KEY`.
Environment-specific files: `.env`, `.env.staging`, `.env.production`.

### Run the App

```sh
# Start Metro dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run with a specific environment
npm run android:staging
npm run android:prod
```

---

## Development

### Storybook

```sh
npm run storybook
```

### Linting & Type Checking

```sh
npm run lint
npm run typecheck
```

### Testing

```sh
npm test                  # Run all unit/integration tests
npm run test:watch        # Watch mode
npm run test:ci           # CI mode with coverage report
```

Coverage threshold: **70%** (branches, functions, lines, statements).

### End-to-End Tests (Detox)

```sh
npm run test:e2e:ios:build   # Build for E2E
npm run test:e2e:ios         # Run E2E tests
```

---

## CI/CD

| Workflow | Trigger |
|---|---|
| Commitlint | Every push/PR — enforces Conventional Commits |
| Test | Every push/PR — Jest unit tests |
| Deploy | Configured via Fastlane for iOS/Android distribution |

See [docs/ci-cd.md](docs/ci-cd.md) and [docs/fastlane.md](docs/fastlane.md) for details.

---

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint + Husky.

```
feat: add login screen
fix: resolve token refresh race condition
chore: update dependencies
```
