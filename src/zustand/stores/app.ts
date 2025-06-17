import { ExtractState } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';

import { zustandStorage } from '~/src/library/utils/storage';

type State = {
  profile: any;

  token: string | undefined;

  loadingApp: boolean;

  loading: boolean;

  isLogin: boolean;
};

type Actions = {
  logout: () => void;
  endLoadApp: () => void;
  setProfile: (payload: State['profile']) => void;
  setToken: (token: State['token']) => void;
  startLoadApp: () => void;
  setLoading: (newState: State['loading']) => void;
  setLogin: (newState: State['isLogin']) => void;
};

const initialState: State = {
  loading: false,
  loadingApp: true,
  profile: {},
  token: undefined,
  isLogin: false,
};

const store = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      endLoadApp: () => {
        set((state) => {
          state.loadingApp = false;
        });
      },
      logout: () => {
        set((state) => {
          state.token = undefined;

          state.profile = {};
        });
      },
      setLoading: (newState) => {
        set((state) => {
          state.loading = newState;
        });
      },
      setLogin: (newState) => {
        set((state) => {
          state.isLogin = newState;
        });
      },
      setProfile: (payload) => {
        set((state) => {
          state.profile = payload;
        });
      },
      setToken: (token) => {
        set((state) => {
          state.token = token;
        });
      },
      startLoadApp: () => {
        set((state) => {
          state.loadingApp = true;
        });
      },
    })),
    {
      name: 'AUTH_STORAGE',
      storage: zustandStorage,
    }
  )
);

export const useAppStore = store;

export type AppState = ExtractState<typeof useAppStore>;
