import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/navigation.types';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { Input } from '@shared/components/input';
import { Button } from 'heroui-native/button';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending, error } = useLoginMutation();

  const handleLogin = () => {
    login(
      { email, password },
      { onError: err => Alert.alert(t('auth.loginFailed'), err.message) },
    );
  };

  return (
    <View testID="login-screen" style={styles.container}>
      <Text style={styles.title}>{t('auth.welcomeBack')}</Text>

      <Input
        testID="login-email-input"
        label={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={t('auth.emailPlaceholder')}
      />
      <Input
        testID="login-password-input"
        label={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder={t('auth.passwordPlaceholder')}
        error={error?.message}
      />

      <Button testID="login-submit-button" onPress={handleLogin} isDisabled={isPending}>
        {isPending ? t('auth.signingIn') : t('auth.signIn')}
      </Button>

      <Button testID="login-create-account-button" variant="ghost" onPress={() => navigation.navigate('Register')}>
        {t('auth.createAccount')}
      </Button>

      <Text>{Config.API_URL}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 32 },
});
