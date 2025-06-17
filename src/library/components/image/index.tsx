import { Image as ExpoImage, ImageProps } from 'expo-image';
import { StyleSheet } from 'react-native';

export const Image = ({ ...rest }: ImageProps) => {
  // render
  return (
    <ExpoImage
      transition={{ duration: 300, effect: 'cross-dissolve' }}
      placeholderContentFit="cover"
      placeholder={{
        cacheKey: rest.recyclingKey ?? (typeof rest.source === 'string' ? rest.source : undefined),
        thumbhash: '3PcNNYSFeXh/k0oGLQaSVsN0BVhn2oq2Z5SQUQcZ',
      }}
      style={StyleSheet.absoluteFillObject}
      {...rest}
    />
  );
};
