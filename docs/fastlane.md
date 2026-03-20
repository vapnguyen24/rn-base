# Fastlane CI/CD

Automated build and deployment for iOS and Android using [Fastlane](https://fastlane.tools).

---

## Overview

| Lane | Env file | iOS | Android |
|------|----------|-----|---------|
| `beta` | `.env.staging` | Build → Upload to TestFlight | Build AAB → Upload to Internal Testing |
| `release` | `.env.production` | Build → Submit to App Store | Build AAB → Upload to Production |

Both lanes build with their own environment — staging for beta testing, production for store release. There is no "promote" step; each lane builds independently.

---

## Prerequisites

### General

- Ruby (see `.ruby-version` or `Gemfile`)
- Bundler: `gem install bundler`
- Dependencies: `bundle install`

### iOS

- Xcode with a valid Apple Developer account
- A **private Git repository** to store certificates (used by `match`)
- App Store Connect API Key ([generate here](https://appstoreconnect.apple.com) → Users & Access → Integrations → Keys)

### Android

- JDK 17
- An Android **keystore** file (`.jks`)
- A Google Play **Service Account** JSON key with release permissions

---

## Environment Files

The project has three environment files managed by `react-native-config`:

| File | Used by | API |
|------|---------|-----|
| `.env` | Local development | Dev API |
| `.env.staging` | `beta` lane | Staging API |
| `.env.production` | `release` lane | Production API |

Fastlane selects the correct file automatically based on the lane — no manual switching needed.

---

## Environment Variables

Copy `env.fastlane.example` to `.env.fastlane` and fill in all values.

```bash
cp env.fastlane.example .env.fastlane
```

> `.env.fastlane` is gitignored. Never commit it.

| Variable | Description |
|----------|-------------|
| `IOS_APP_IDENTIFIER` | iOS bundle ID, e.g. `com.yourcompany.heroui` |
| `APPLE_ID` | Your Apple ID email |
| `ITC_TEAM_ID` | App Store Connect numeric team ID |
| `TEAM_ID` | Apple Developer alphanumeric team ID |
| `MATCH_GIT_URL` | Private Git repo URL for storing certificates |
| `MATCH_PASSWORD` | Password used to encrypt/decrypt the certs repo |
| `APP_STORE_CONNECT_API_KEY_ID` | API Key ID from App Store Connect |
| `APP_STORE_CONNECT_API_ISSUER_ID` | Issuer ID from App Store Connect |
| `APP_STORE_CONNECT_API_KEY_CONTENT` | Contents of the `.p8` key file |
| `ANDROID_PACKAGE_NAME` | Android package name, e.g. `com.heroui` |
| `GOOGLE_PLAY_JSON_KEY_PATH` | Path to Google Play service account JSON |
| `KEYSTORE_PATH` | Absolute path to the `.jks` keystore file |
| `KEYSTORE_PASSWORD` | Keystore password |
| `KEY_ALIAS` | Key alias inside the keystore |
| `KEY_PASSWORD` | Key password |
| `GIT_TAG` | Version tag, e.g. `v1.0.1` (set automatically by CI) |
| `VERSION_CODE` | Android version code (set automatically by CI run number) |

---

## Versioning

Version is read from the git tag automatically.

| Tag | Version name on store | Android version code |
|-----|----------------------|----------------------|
| `v1.0.0` | `1.0.0` | GitHub Actions run number (auto-increment) |
| `v1.1.0` | `1.1.0` | GitHub Actions run number (auto-increment) |

iOS build number is also auto-incremented by `increment_build_number`.

---

## iOS Setup

### 1. Initialize Match (first time only)

[Match](https://docs.fastlane.tools/actions/match/) stores your certificates and provisioning profiles in a private Git repo, encrypted with a password. All team members and CI share the same certs.

```bash
cd ios
bundle exec fastlane match init        # enter your MATCH_GIT_URL when prompted
bundle exec fastlane match appstore    # generate & push App Store cert + profile
```

### 2. Run Lanes

```bash
cd ios

# Case 1 — Build with staging env, upload to TestFlight
bundle exec fastlane beta

# Case 2 — Build with production env, submit to App Store
bundle exec fastlane release
```

### How it works

**`beta` lane:**
1. `match` — sync certificates
2. `increment_version_number` — set version from git tag (e.g. `1.0.1`)
3. `increment_build_number` — auto-bump build number
4. `build_app` — compile with `ENVFILE=.env.staging`
5. `upload_to_testflight` — upload to TestFlight

**`release` lane:**
1. `match` — sync certificates
2. `increment_version_number` — set version from git tag
3. `increment_build_number` — auto-bump build number
4. `build_app` — compile with `ENVFILE=.env.production`
5. `upload_to_app_store` — submit for App Store review

---

## Android Setup

### 1. Create a Keystore (first time only)

```bash
keytool -genkey -v \
  -keystore android/app/heroui.jks \
  -alias heroui \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Store the keystore file securely. Do **not** commit it to Git.

### 2. Create a Google Play Service Account

1. Go to [Google Play Console](https://play.google.com/console) → Setup → API access
2. Link to a Google Cloud project
3. Create a **Service Account** with **Release Manager** role
4. Download the JSON key → place it at `android/fastlane/google-play-key.json`

> `google-play-key.json` is gitignored. Store it securely.

### 3. Run Lanes

```bash
cd android

# Case 1 — Build with staging env, upload to Internal Testing
bundle exec fastlane beta

# Case 2 — Build with production env, upload to Production track
bundle exec fastlane release
```

### How it works

**`beta` lane:**
1. `gradle` — build signed `.aab` with `envConfigFile=.env.staging`, version from tag, version code from CI run number
2. `upload_to_play_store(track: "internal")` — upload to Internal Testing

**`release` lane:**
1. `gradle` — build signed `.aab` with `envConfigFile=.env.production`, version from tag, version code from CI run number
2. `upload_to_play_store(track: "production")` — upload directly to Production

---

## CI/CD with GitHub Actions

See [ci-cd.md](./ci-cd.md) for the full GitHub Actions setup.

Store all secrets in **GitHub → Settings → Secrets and variables → Actions**.

Required secrets:

| Secret | Used by |
|--------|---------|
| `MATCH_PASSWORD` | iOS |
| `MATCH_GIT_BASIC_AUTHORIZATION` | iOS (base64 of `username:token`) |
| `MATCH_GIT_URL` | iOS |
| `ASC_KEY_ID` | iOS |
| `ASC_ISSUER_ID` | iOS |
| `ASC_KEY_CONTENT` | iOS |
| `IOS_APP_IDENTIFIER` | iOS |
| `APPLE_ID` | iOS |
| `ITC_TEAM_ID` | iOS |
| `TEAM_ID` | iOS |
| `KEYSTORE_FILE_BASE64` | Android (base64-encoded `.jks`) |
| `KEYSTORE_PASSWORD` | Android |
| `KEY_ALIAS` | Android |
| `KEY_PASSWORD` | Android |
| `GOOGLE_PLAY_JSON_KEY` | Android (full JSON content) |
| `ANDROID_PACKAGE_NAME` | Android |

---

## File Structure

```
├── Gemfile                          # fastlane + dotenv gems
├── .env.fastlane.example            # env var template
├── .env.staging                     # staging API config
├── .env.production                  # production API config
├── ios/
│   └── fastlane/
│       ├── Appfile                  # app ID, Apple team IDs
│       └── Fastfile                 # beta + release lanes
└── android/
    └── fastlane/
        ├── Appfile                  # package name, Play Store key path
        └── Fastfile                 # beta + release lanes
```

---

## Quick Reference

```bash
# Install dependencies
bundle install

# iOS
cd ios
bundle exec fastlane beta            # staging env → TestFlight
bundle exec fastlane release         # production env → App Store

# Android
cd android
bundle exec fastlane beta            # staging env → Internal Testing
bundle exec fastlane release         # production env → Production track
```
