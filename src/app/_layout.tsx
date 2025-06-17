import { PortalHost, PortalProvider } from '@gorhom/portal';
import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useShallow } from 'zustand/shallow';

import { SnackBar } from '~/src/library';
import I18n from '~/src/library/utils/i18n';
import { theme, useLoadFont } from '~/src/theme';
import '~/declare';
import { selectAppIsLogin } from '~/src/zustand/selectors/app';
import { useAppStore } from '~/src/zustand/stores/app';
import { AutocompleteDropdownContextProvider } from '~/src/library/components/drop-down';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

const isStory = true;

export const AppStack = () => {
  const isLogin = useAppStore(useShallow(selectAppIsLogin));
  const isSplash = false;
  const isOnboard = false;

  return (
    <Stack>
      <Stack.Protected guard={isStory}>
        <Stack.Screen name="(story-book)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isSplash}>
        {/* <Stack.Screen name="splash" options={{ headerShown: false }} /> */}
      </Stack.Protected>

      <Stack.Protected guard={isOnboard && !isStory}>
        {/* <Stack.Screen name="(onboard)" options={{ headerShown: false }} /> */}
      </Stack.Protected>

      <Stack.Protected guard={isLogin && !isSplash && !isOnboard && !isStory}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLogin && !isSplash && !isOnboard && !isStory}>
        <Stack.Screen name="(un-auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default function Layout() {
  const isLoaded = useLoadFont();

  if (!isLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={I18n}>
          <AutocompleteDropdownContextProvider>
            <Suspense fallback={null}>
              <PortalProvider>
                <GestureHandlerRootView style={styles.root}>
                  <StatusBar translucent backgroundColor="transparent" />
                  <AppStack />
                  <PortalHost name="AppModal" />
                  <SnackBar />
                </GestureHandlerRootView>
              </PortalProvider>
            </Suspense>
          </AutocompleteDropdownContextProvider>
        </I18nextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
