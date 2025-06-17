import { router, Stack } from 'expo-router';

import { Box, PrimaryButton, Screen, Text } from '~/src/library';
import { useAppStore } from '~/src/zustand/stores/app';

export default function Register() {
  const { setLogin } = useAppStore();

  const handleLogin = () => {
    router.back()
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Register',  headerTitleAlign: 'center' }} />
      <Screen>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text textAlign="center">Register</Text>
          <PrimaryButton text="Register" onPress={handleLogin} />
        </Box>
      </Screen>
    </>
  );
}
