/**
 * Shared test utilities
 *
 * Wraps @testing-library/react-native's `render` with all global providers
 * required by the app (NavigationContainer, QueryClientProvider, etc.).
 *
 * Usage:
 *   import { render, screen } from '@shared/utils/test-utils';
 *
 *   render(<MyComponent />);
 *
 * Best practices:
 *  - NEVER import from '@testing-library/react-native' directly in tests.
 *    Always use this wrapper so providers are always present.
 *  - Navigation hooks (useNavigation, useRoute) are globally mocked in
 *    jest.setup.native.ts — no NavigationContainer needed here.
 *  - Use `userEvent` from '@testing-library/react-native' for user interactions.
 */
import React, { type PropsWithChildren, type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ─── QueryClient factory ──────────────────────────────────────────────────────
// New instance per test — avoids shared cache state between tests.
function buildTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,      // No retries in tests — fail fast, fail loudly
        gcTime: Infinity,  // Keep cache for the duration of the test
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

// ─── Provider wrapper ─────────────────────────────────────────────────────────
interface WrapperProps extends PropsWithChildren {
  queryClient?: QueryClient;
}

function AllProviders({ children, queryClient }: WrapperProps) {
  const client = queryClient ?? buildTestQueryClient();
  return (
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        {children}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

// ─── Custom render ────────────────────────────────────────────────────────────
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

function customRender(
  ui: ReactElement,
  { queryClient, ...options }: CustomRenderOptions = {},
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <AllProviders queryClient={queryClient}>{children}</AllProviders>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything so callers have a single import point
export * from '@testing-library/react-native';
export { customRender as render };
