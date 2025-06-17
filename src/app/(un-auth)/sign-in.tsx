import { Stack, useRouter } from 'expo-router';

import { Box, PrimaryButton, Screen, Text } from '~/src/library';
import { useAppStore } from '~/src/zustand/stores/app';

export default function SignIn() {
  const { setLogin } = useAppStore();
  const router = useRouter();

  const handleLogin = () => {
    setLogin(true);
  };

  const handleRegister = () => {
    router.navigate('/(un-auth)/register');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Login', headerTitleAlign: 'center' }} />
      <Screen>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text textAlign="center">Signin</Text>
          <PrimaryButton text="Log in" onPress={handleLogin} />
          <PrimaryButton text="Register" onPress={handleRegister} />
        </Box>
      </Screen>
    </>
  );
}
