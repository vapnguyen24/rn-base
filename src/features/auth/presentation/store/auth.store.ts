import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@core/storage/mmkv.storage';
import type { User } from '../../domain/entities/User';
import type { AuthTokens } from '../../domain/repositories/auth.repository.interface';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setTokens: (tokens) => set({ tokens }),
      clearAuth: () => set({ user: null, tokens: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      // Only persist session data — never UI-only state
      partialize: (s) => ({ user: s.user, tokens: s.tokens }),
      onRehydrateStorage: () => (state) => {
        if (state?.tokens) {
          state.isAuthenticated = true;
        }
      },
    },
  ),
);
