
# 📱 Project Name

## 🚀 Introduction

App name introduction

---

## 🧠 Features

- 🔐 Feature 1
- 🧑‍💼 Feature 2
- 📟 Feature 3
- 🚨 Feature 4
- 📊 Feature 5
- 🧩 Feature 6

---

## 🧱 Project Structure

Following the _MVVM / Feature-based structure_ model. Main directory structure:

```
assets/                  # Static assets such as images, icons, fonts
env/                     # Environment config files (.env.development, .env.production, etc.)
src/                     # Main source code of the application\
├── app                  # App routing and layout (e.g. Expo Router / Next.js-style routing)
│   ├── (auth)           # Authenticated user routes/layouts
│   ├── (un-auth)        # Unauthenticated user routes/layouts
│   ├── +html.tsx        # Root HTML entry point (used in SSR or web exports)
│   ├── +not-found.tsx   # 404 Not Found page
│   └── _layout.tsx      # Global layout wrapper for all screens/routes
├── common               # Reusable logic helpers and utility modules
│   ├── animated         # Animation-related utilities and components
│   ├── constant         # App-wide constants (routes, configs, etc.)
│   ├── hooks            # Custom React hooks
│   ├── method           # Generic logic functions
│   ├── regex            # Predefined regular expressions
│   ├── signal           # Signal-based state (if using React/Preact signals)
│   ├── string           # String manipulation helpers
│   └── yup-validate     # Yup validation schemas
├── components           # Screen-specific UI components (used only within certain screens)
├── data                 
│   └── remote           # Remote data sources (API fetchers, services)
├── library              # Internal base libraries shared across the app
│   ├── components       # Core UI components (e.g., CustomText, CustomButton)
│   ├── index.ts         # Library entry point
│   ├── networking       # HTTP client setup (Axios, interceptors, etc.)
│   └── utils            # Utility functions specific to the library
├── models               # Type definitions and interfaces for data models
│   ├── input            # Input payload models (API requests)
│   └── output           # Output data models (API responses)
├── theme                # Design system: colors, typography, theming
│   ├── colors           # Color palette definitions
│   ├── index.ts         # Theme entry point
│   ├── text-presets     # Preset definitions for text styles
│   ├── theme.ts         # Main theme configuration
│   └── typography       # Font families, sizes, and text weights
└── zustand              # Global state management with Zustand
    ├── selectors        # Zustand selectors for extracting state
    └── stores           # Zustand store definitions (auth, device, etc.)
```

---

## ⚙️ Installation & Running

### System Requirements

- Node.js >= 18
- Yarn or npm
- Android Studio / Xcode
- Watchman (macOS)

### Installation

```bash
git clone https://github.com/yourusername/your-project.git
cd your-project
yarn install
```

### Expo prebuild

```bash
npx expo prebuild      # (only use this script when clone this source in first time or install new native library)
```

### Expo start

```bash
yarn start
```

### Run on Android

```bash
yarn dev:android        # development env
yarn staging:android    # staging env
yarn pro:android        # production env
```

### Run on IOS

```bash
yarn dev:ios        # development env
yarn staging:ios    # staging env
yarn pro:ios        # production env
```

---

## 🔐 Environment Configuration

All environment files are located in the `env` folder at the project root (contact the owner to obtain this folder if your project does not have it).

Remember add folder env to gitiginore

Use a library like [`react-native-keys`](https://github.com/numandev1/react-native-keys) or similar to load environment variables.

---

## 📸 Screenshot demo

Screenshot content

---

## 🛠️ Tech stack

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Axios](https://axios-http.com/) – HTTP client
- [React Query](https://tanstack.com/query/v4/docs/framework/react/overview) - Server State
- [Restyle](https://shopify.github.io/restyle/) - UI Styling
- [Formik](https://formik.org/) - Form Management

---


## 📄 License

License content

---

## 📬 Contact

Contact content