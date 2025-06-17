import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
