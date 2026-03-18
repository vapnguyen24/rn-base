import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Compass, Bell, User } from 'lucide-react-native';
import type { MainTabParamList } from './navigation.types';
import { HomeScreen } from '@features/main/presentation/screens/home.screen';
import { ExploreScreen } from '@features/main/presentation/screens/explore.screen';
import { NotificationsScreen } from '@features/main/presentation/screens/notifications.screen';
import { ProfileScreen } from '@features/main/presentation/screens/profile.screen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function HomeIcon({ color, size }: { color: string; size: number }) {
  return <Home color={color} size={size} />;
}

function ExploreIcon({ color, size }: { color: string; size: number }) {
  return <Compass color={color} size={size} />;
}

function NotificationsIcon({ color, size }: { color: string; size: number }) {
  return <Bell color={color} size={size} />;
}

function ProfileIcon({ color, size }: { color: string; size: number }) {
  return <User color={color} size={size} />;
}

export function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarIcon: ExploreIcon }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarIcon: NotificationsIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ProfileIcon }}
      />
    </Tab.Navigator>
  );
}
