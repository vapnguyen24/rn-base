import { NativeModules } from 'react-native';

const { AppVersionModule } = NativeModules;

export const nativeAppVersion: string = AppVersionModule?.appVersion ?? '0.0.0';
