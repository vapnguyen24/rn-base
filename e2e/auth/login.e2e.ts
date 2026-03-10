/**
 * E2E test — Login flow (Detox)
 *
 * Guidelines:
 *  - All waits use Detox's built-in matcher conditions (waitFor + toBeVisible)
 *    → no arbitrary sleep() calls (primary source of flakiness)
 *  - Test IDs are used for element targeting — not text strings — so the
 *    tests remain locale/copy-independent.
 *  - Each test starts from a clean app state (reinstallApp: true in .detoxrc.js)
 *  - Add `testID` props to UI elements: testID="login-email-input" etc.
 */

describe('Auth — Login flow', () => {
  beforeAll(async () => {
    // Wait for the app to be ready before running any test
    await device.launchApp({ newInstance: true });
  });

  afterEach(async () => {
    // Reset the app to a fresh state after each test to prevent state leakage
    await device.reloadReactNative();
  });

  // ─── Happy path ─────────────────────────────────────────────────────────────
  // TODO: restore when API is available
  xit('should log in with valid credentials and land on the home screen', async () => {
    // Assert the login screen is visible
    await waitFor(element(by.id('login-screen')))
      .toBeVisible()
      .withTimeout(5_000);

    // Fill in credentials
    await element(by.id('login-email-input')).typeText('user@example.com');
    await element(by.id('login-password-input')).typeText('secret');

    // Dismiss keyboard before tapping (prevents tap targeting issues on Android)
    await element(by.id('login-password-input')).tapReturnKey();

    await element(by.id('login-submit-button')).tap();

    // After successful login the home screen should appear
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(10_000);
  });

  // ─── Error path ─────────────────────────────────────────────────────────────
  // TODO: restore when API is available
  xit('should show an error alert for invalid credentials', async () => {
    await waitFor(element(by.id('login-screen')))
      .toBeVisible()
      .withTimeout(5_000);

    await element(by.id('login-email-input')).typeText('wrong@example.com');
    await element(by.id('login-password-input')).typeText('badpass');
    await element(by.id('login-submit-button')).tap();

    // The error alert should appear
    await waitFor(element(by.text('Invalid credentials')))
      .toBeVisible()
      .withTimeout(5_000);
  });

  // ─── Navigation ─────────────────────────────────────────────────────────────
  it('should navigate to the registration screen', async () => {
    await waitFor(element(by.id('login-screen')))
      .toBeVisible()
      .withTimeout(5_000);

    await element(by.id('login-create-account-button')).tap();

    await waitFor(element(by.id('register-screen')))
      .toBeVisible()
      .withTimeout(5_000);
  });
});
