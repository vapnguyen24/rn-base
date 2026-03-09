import { useMutation } from '@tanstack/react-query';
import { authFactory } from '@core/di/auth.factory';
import { useAuthStore } from '../store/auth.store';
import type { LoginCredentials } from '../../domain/repositories/auth.repository.interface';

export function useLoginMutation() {
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authFactory.getLoginUseCase().execute(credentials),
    onSuccess: ({ user, tokens }) => {
      setUser(user);
      setTokens(tokens);
    },
  });
}
