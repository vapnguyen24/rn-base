import './global.css';
import './src/core/i18n/i18n';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HeroUINativeProvider } from 'heroui-native';
import { Uniwind, useUniwind } from 'uniwind';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/core/query/query.client';
import { RootNavigator } from './src/navigation/root.navigator';
import { NetworkStatusMonitor } from './src/shared/components/network-status-monitor';

function AppProviders({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    Uniwind.setTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
  }, [systemColorScheme]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <QueryClientProvider client={queryClient}>
          <HeroUINativeProvider>{children}</HeroUINativeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { theme } = useUniwind();
  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <NetworkStatusMonitor />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
