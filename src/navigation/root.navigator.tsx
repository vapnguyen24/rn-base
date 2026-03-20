import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation.types';
import { AuthNavigator } from './auth.navigator';
import { MainNavigator } from './main.navigator';
import { useAuthStore } from '@features/auth/presentation/store/auth.store';
import { ForceUpdateModal } from '@shared/components/force-update-modal';
import { useForceUpdate } from '@shared/hooks/useForceUpdate';
import { navigationRef } from './navigation.service';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * TODO: Replace with a real API call or remote config fetch.
 * Example: const { data } = useQuery({ queryKey: ['app-config'], queryFn: fetchAppConfig });
 * Then pass data?.minimumVersion to useForceUpdate.
 */
const MINIMUM_VERSION: string | undefined = undefined;

export function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isUpdateRequired = useForceUpdate(MINIMUM_VERSION);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>

      <ForceUpdateModal isOpen={isUpdateRequired} />
    </NavigationContainer>
  );
}
