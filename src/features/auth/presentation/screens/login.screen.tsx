import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/navigation.types';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { Button } from 'heroui-native/button';
import { FormField } from '@shared/components/form';
import { useZodForm } from '@shared/hooks/useZodForm';
import { loginSchema } from '../schemas/login.schema';
import type { LoginSchema } from '../schemas/login.schema';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { mutate: login, isPending } = useLoginMutation();

  const { control, handleSubmit } = useZodForm<LoginSchema>(loginSchema);

  const onSubmit = (data: LoginSchema) => {
    login(data, {
      onError: err => Alert.alert(t('auth.loginFailed'), err.message),
    });
  };

  return (
    <View
      testID="login-screen"
      className="bg-background gap-4"
      style={styles.container}
    >
      <Text style={styles.title}>{t('auth.welcomeBack')}</Text>

      <FormField
        testID="login-email-input"
        control={control}
        name="email"
        label={t('auth.email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={t('auth.emailPlaceholder')}
      />

      <FormField
        testID="login-password-input"
        control={control}
        name="password"
        label={t('auth.password')}
        secureTextEntry
        placeholder={t('auth.passwordPlaceholder')}
      />

      <Button
        testID="login-submit-button"
        onPress={handleSubmit(onSubmit)}
        isDisabled={isPending}
        className="mt-2"
      >
        {isPending ? t('auth.signingIn') : t('auth.signIn')}
      </Button>

      <Button
        testID="login-create-account-button"
        variant="ghost"
        onPress={() => navigation.navigate('Register')}
      >
        {t('auth.createAccount')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 32 },
});
