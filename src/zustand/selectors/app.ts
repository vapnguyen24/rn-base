import { AppState } from '~/src/zustand/stores/app';

export const selectAppLoading = (state: AppState) => ({
  loadingApp: state.loadingApp,
});

export const selectAppToken = (state: AppState) => state.token;

export const selectAppIsLogin = (state: AppState) => state.isLogin;
