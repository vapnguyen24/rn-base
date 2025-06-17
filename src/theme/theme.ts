import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { darkColors } from '~/src/theme/colors/dark';
import { lightColors } from '~/src/theme/colors/light';
import { textPresets } from '~/src/theme/text-presets';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const theme = createTheme({
  colors: {
    ...lightColors,
  },
  spacing: {
    xs_4: 4,
    s_8: 8,
    sm_12: 12,
    m_16: 16,
    mxl_20: 20,
    ml_24: 24,
    l_32: 32,
    xl_64: 64,
  },
  borderRadii: {
    s_3: 3,
    sm_4: 4,
    m_6: 6,
    ml_8: 8,
    l_12: 12,
    xl_24: 24,
    circle: 999,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    ...textPresets,
    defaults: {},
  },
  cardVariants: {
    default: {},
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
});

export const darkTheme = createTheme({
  ...theme,
  colors: {
    ...darkColors,
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T & NamedStyles<any>
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
