# CI/CD Guide

This project uses **GitHub Actions** for automated testing and deployment.

---

## Workflows

| File | Trigger | Purpose |
|------|---------|---------|
| `.github/workflows/test.yml` | Push / PR to `main`, `develop` | Run unit tests + E2E tests |
| `.github/workflows/deploy.yml` | Push version tag or manual | Build + upload to stores |

---

## test.yml — Automated Testing

Runs automatically on every push and pull request to `main` or `develop`.

### Jobs

| Job | Runner | What it does |
|-----|--------|--------------|
| Unit & Component Tests | `ubuntu-latest` | Jest + React Testing Library |
| iOS E2E | `macos-14` | Detox on iOS Simulator |
| Android E2E | `ubuntu-latest` | Detox on Android Emulator |

E2E jobs only run if unit tests pass first.

No action needed — this workflow runs automatically on every push.

---

## deploy.yml — Build & Deploy

### Environment per lane

| Lane | Env file | Result |
|------|----------|--------|
| `beta` | `.env.staging` | TestFlight / Internal Testing |
| `release` | `.env.production` | App Store / Google Play Production |

Each lane builds its own binary with the correct environment baked in — no promote step.

---

### Trigger 1: Push a version tag (recommended for beta)

Tag your commit with a version number. This automatically runs the **beta** lane for both platforms.

```bash
git add .
git commit -m "chore: bump version to 1.2.0"
git tag v1.2.0
git push origin main --tags
```

Result:
- iOS: builds with `.env.staging` → uploads to **TestFlight**
- Android: builds with `.env.staging` → uploads to **Internal Testing**
- Version name on both stores: `1.2.0`
- Android version code: auto-incremented (GitHub Actions run number)
- iOS build number: auto-incremented

---

### Trigger 2: Manual dispatch

Go to **GitHub → your repo → Actions → Deploy → Run workflow**.

| Input | Options | Description |
|-------|---------|-------------|
| Platform | `both` / `ios` / `android` | Which platform to deploy |
| Lane | `beta` / `release` | beta = staging env, release = production env |

#### Common scenarios

| Goal | Platform | Lane |
|------|----------|------|
| Upload staging build to TestFlight | `ios` | `beta` |
| Upload staging build to Internal Testing | `android` | `beta` |
| Release production build to App Store | `ios` | `release` |
| Release production build to Google Play | `android` | `release` |
| Release production to both stores | `both` | `release` |

---

## Release Flow

```
develop branch
    │
    ├── push → test.yml (unit + E2E)
    │
    ▼
merge to main
    │
    ├── push → test.yml (unit + E2E)
    │
    ▼
git tag v1.x.x → deploy.yml (beta lane)
    │
    ├── iOS:     .env.staging → TestFlight
    └── Android: .env.staging → Internal Testing
                      │
                      ▼  QA sign-off
              Manual dispatch → lane: release
                      │
                      ├── iOS:     .env.production → App Store (review)
                      └── Android: .env.production → Play Store Production
```

---

## Required GitHub Secrets

Go to **GitHub → Settings → Secrets and variables → Actions → New repository secret**.

### iOS

| Secret | How to get it |
|--------|--------------|
| `IOS_APP_IDENTIFIER` | Your bundle ID, e.g. `com.yourcompany.heroui` |
| `APPLE_ID` | Your Apple ID email |
| `ITC_TEAM_ID` | App Store Connect → Users & Access → numeric team ID |
| `TEAM_ID` | Apple Developer portal → alphanumeric team ID |
| `MATCH_GIT_URL` | URL of the private certs repo |
| `MATCH_PASSWORD` | Password used when running `fastlane match init` |
| `MATCH_GIT_BASIC_AUTHORIZATION` | `echo -n "github_username:personal_access_token" \| base64` |
| `APP_STORE_CONNECT_API_KEY_ID` | App Store Connect → Keys → Key ID |
| `APP_STORE_CONNECT_API_ISSUER_ID` | App Store Connect → Keys → Issuer ID |
| `APP_STORE_CONNECT_API_KEY_CONTENT` | Contents of the downloaded `.p8` file |

### Android

| Secret | How to get it |
|--------|--------------|
| `ANDROID_PACKAGE_NAME` | Your package name, e.g. `com.heroui` |
| `KEYSTORE_FILE_BASE64` | `base64 -i android/app/heroui.jks \| pbcopy` then paste |
| `KEYSTORE_PASSWORD` | Password set when creating the keystore |
| `KEY_ALIAS` | Alias set when creating the keystore |
| `KEY_PASSWORD` | Key password set when creating the keystore |
| `GOOGLE_PLAY_JSON_KEY` | Full contents of `google-play-key.json` (service account) |

---

## Versioning Convention

Use [semantic versioning](https://semver.org): `vMAJOR.MINOR.PATCH`

| Tag | When to use |
|-----|-------------|
| `v1.0.0` | Major release or first public release |
| `v1.1.0` | New features |
| `v1.1.1` | Bug fixes |

The version name on both stores matches the tag exactly (e.g. tag `v1.2.3` → store shows `1.2.3`).

---

## Troubleshooting

**Deploy did not trigger after tag push**
- Make sure the tag starts with `v` (e.g. `v1.0.0`, not `1.0.0`)
- Check that you pushed the tag: `git push origin --tags`

**Wrong API URL in the build**
- `beta` always uses `.env.staging`, `release` always uses `.env.production`
- Verify the correct API URL is in each file before tagging

**iOS build fails with certificate error**
- Re-run `cd ios && bundle exec fastlane match appstore` locally to refresh certs
- Verify `MATCH_PASSWORD` and `MATCH_GIT_BASIC_AUTHORIZATION` secrets are correct

**Android build fails with keystore error**
- Re-generate `KEYSTORE_FILE_BASE64`: `base64 -i android/app/heroui.jks | pbcopy`
- Verify `KEY_ALIAS` matches exactly what was used when creating the keystore

**See detailed logs**
- Go to Actions → click the failed workflow run → click the failed job → expand the failed step
