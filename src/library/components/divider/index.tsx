import { useTheme } from '@shopify/restyle';
import { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { DividerProps } from './type';

import { Box } from '~/src/library/components/core/Box';
import { Theme } from '~/src/theme';

export const Divider = ({ height = 1, colors = 'neutral200' }: DividerProps) => {
  // state
  const theme = useTheme<Theme>();

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      backgroundColor:
        colors && typeof theme.colors[colors] === 'string'
          ? (theme.colors[colors] as string)
          : undefined,
      height: height * StyleSheet.hairlineWidth,
      width: '100%',
    }),
    [colors, height, theme.colors]
  );

  // render
  return <Box style={divider} />;
};
