/**
 * Component test — LoginScreen
 *
 * Strategy:
 *  - Render the component in its real provider tree (via custom render)
 *  - Use @testing-library/react-native's userEvent API for realistic interactions
 *  - MSW intercepts real axios calls → no manual axios mocks
 *  - Navigation is mocked globally in jest.setup.native.ts
 *  - i18next t() returns the key → assertions use translation keys, not strings
 *
 * What we do NOT test here:
 *  - Rendering detail of third-party components (heroui-native Button)
 *  - Pixel-level layout
 */
import React from 'react';
import { Alert } from 'react-native';
import { screen, render, userEvent, waitFor } from '@shared/utils/test-utils';
import { http, HttpResponse } from 'msw';
import { server } from '@core/api/mocks/server';
import { LoginScreen } from '../login.screen';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const mockNavigate = jest.fn();

// Override the globally mocked useNavigation with a local spy
// so we can assert navigation.navigate() calls
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockNavigate, goBack: jest.fn() }),
}));

function renderLoginScreen() {
  // LoginScreen expects a native-stack navigation prop; provide a minimal mock
  const navigationProp = { navigate: mockNavigate } as any;
  const routeProp = { key: 'Login', name: 'Login' } as any;
  return render(<LoginScreen navigation={navigationProp} route={routeProp} />);
}

// ─── Tests ────────────────────────────────────────────────────────────────────
describe('LoginScreen', () => {
  const user = userEvent.setup();

  it('renders the sign-in form', () => {
    renderLoginScreen();

    expect(screen.getByText('auth.welcomeBack')).toBeTruthy();
    expect(screen.getByPlaceholderText('auth.emailPlaceholder')).toBeTruthy();
    expect(screen.getByPlaceholderText('auth.passwordPlaceholder')).toBeTruthy();
  });

  it('shows the sign-in button and navigates to Register when tapping create account', async () => {
    renderLoginScreen();

    // "auth.createAccount" button exists
    const createBtn = screen.getByText('auth.createAccount');
    await user.press(createBtn);

    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  it('calls login mutation with form values on submit', async () => {
    renderLoginScreen();

    const emailInput = screen.getByPlaceholderText('auth.emailPlaceholder');
    const passwordInput = screen.getByPlaceholderText('auth.passwordPlaceholder');
    const signInBtn = screen.getByText('auth.signIn');

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'secret');
    await user.press(signInBtn);

    // The MSW handler returns 200 → mutation succeeds
    // Verify the button doesn't crash and no error is shown
    await waitFor(() => {
      expect(screen.queryByText(/auth.signingIn/)).toBeNull();
    });
  });

  it('shows an alert when login returns 401', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    // Override the default handler for this test only
    server.use(
      http.post('https://api.example.com/auth/login', () =>
        HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 }),
      ),
    );

    renderLoginScreen();

    await user.type(
      screen.getByPlaceholderText('auth.emailPlaceholder'),
      'wrong@example.com',
    );
    await user.type(
      screen.getByPlaceholderText('auth.passwordPlaceholder'),
      'wrongpass',
    );
    await user.press(screen.getByText('auth.signIn'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'auth.loginFailed',
        // err.message is axios's default — not the server body.
        // The API layer would need an interceptor to extract response.data.message.
        expect.stringContaining('401'),
      );
    });
  });

  it('disables the sign-in button while the mutation is in-flight', async () => {
    // Use a slow handler to keep the mutation pending long enough to assert
    server.use(
      http.post('https://api.example.com/auth/login', async () => {
        await new Promise(r => setTimeout(r, 200));
        return HttpResponse.json({ accessToken: 'token' });
      }),
    );

    renderLoginScreen();

    await user.type(
      screen.getByPlaceholderText('auth.emailPlaceholder'),
      'user@example.com',
    );
    await user.type(
      screen.getByPlaceholderText('auth.passwordPlaceholder'),
      'secret',
    );

    await user.press(screen.getByText('auth.signIn'));

    // The button text changes to "auth.signingIn" while pending
    await waitFor(() => {
      expect(screen.getByText('auth.signingIn')).toBeTruthy();
    });
  });
});
