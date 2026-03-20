import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation.types';
import { AuthNavigator } from './auth.navigator';
import { MainNavigator } from './main.navigator';
import { useIsAuthenticated } from '@features/auth/presentation/store/auth.store';
import { ForceUpdateGate } from '@shared/components/force-update-modal/force-update-gate';
import { navigationRef } from './navigation.service';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
      <ForceUpdateGate />
    </NavigationContainer>
  );
}
