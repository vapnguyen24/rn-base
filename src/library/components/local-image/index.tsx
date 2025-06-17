import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';

import { LocalImageProps } from './type';

import { images } from '~/assets/image';
import { Box } from '~/src/library/components/core/Box';

export const LocalImage = ({
  source,
  containerStyle,
  style: styleOverride,
  resizeMode = 'cover',
}: LocalImageProps) => {
  // render
  return (
    <Box style={containerStyle}>
      <Image
        style={[styles.img, styleOverride as ImageStyle]}
        resizeMode={resizeMode}
        source={images[source ?? 'default']}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
  },
});
