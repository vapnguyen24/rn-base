const en = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    error: 'Something went wrong',
  },
  auth: {
    welcomeBack: 'Welcome back',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: '••••••••',
    signIn: 'Sign In',
    signingIn: 'Signing in…',
    createAccount: 'Create account',
    loginFailed: 'Login failed',
  },
} as const;

export default en;
export type Translations = typeof en;
