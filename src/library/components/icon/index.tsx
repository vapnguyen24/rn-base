import { useTheme } from '@shopify/restyle';
import { forwardRef, useMemo } from 'react';
import { Image, ImageProps, ImageStyle } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

import { IconProps } from './type';

import { icons } from '~/assets/icon';
import { Theme } from '~/src/theme';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SIZE = 24;

export const Icon = ({
  icon,
  colors,
  size = SIZE,
  resizeMode = 'contain',
}: IconProps & Pick<ImageProps, 'resizeMode'>) => {
  // state
  const theme = useTheme<Theme>();

  // style
  const style = useMemo<ImageStyle>(() => ({ height: size, width: size }), [size]);

  // render
  return (
    <Image
      style={style}
      tintColor={colors ? theme.colors[colors] : undefined}
      resizeMode={resizeMode}
      source={icons[icon]}
    />
  );
};

export const AnimatedIcon = forwardRef<Image, AnimatedProps<ImageProps> & IconProps>(
  (
    {
      icon,
      colors,
      size = SIZE,
      resizeMode = 'contain',
      ...rest
    }: Partial<AnimatedProps<ImageProps>> & IconProps,
    ref
  ) => {
    // state
    const theme = useTheme<Theme>();

    // style
    const style = useMemo<ImageStyle>(() => ({ height: size, width: size }), [size]);

    // render
    return (
      <AnimatedImage
        ref={ref}
        style={style}
        tintColor={colors ? theme.colors[colors] : undefined}
        resizeMode={resizeMode}
        source={icons[icon]}
        {...rest}
      />
    );
  }
);
