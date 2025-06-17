/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, ColorValue, Linking } from 'react-native';
import { processColor } from 'react-native-reanimated';

export const onShowErrorBase = (msg: string) => {
  Alert.alert(msg);
};

export const openLinking = (url: string) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

export const setAlpha = (color: ColorValue, alpha = 1) => {
  'worklet';
  let num = typeof color === 'number' ? color : processColor(color);

  if (typeof num !== 'number') {
    return color;
  }

  num >>>= 0;

  const b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;

  return 'rgba(' + [r, g, b, alpha].join(',') + ')';
};