import { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { SpacerProps } from './type';

import { Box } from '~/src/library/components/core/Box';

export const Spacer = ({ height = 0, width = 0 }: SpacerProps) => {
  // style
  const actualStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      height,
      width,
    }),
    [height, width]
  );

  // render
  return <Box style={actualStyle} />;
};
