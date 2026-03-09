export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Feed: undefined;
  Profile: { userId: string };
};
