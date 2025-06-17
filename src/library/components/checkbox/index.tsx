import { useTheme } from '@shopify/restyle';
import { useState } from 'react';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';
import { interpolateColor, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';

import { CheckboxProps } from './type';

import { useSharedTransition } from '~/src/common/animated';
import { AnimatedBox } from '~/src/library/components/core';
import { AnimatedIcon } from '~/src/library/components/icon';
import { makeStyles, Theme } from '~/src/theme';

export const Checkbox = ({
  value,
  initialValue = false,
  onToggle,
  size = 24,
  disabled = false,
}: CheckboxProps) => {
  // state
  const styles = stylesSheet();
  const theme = useTheme<Theme>();

  const [localValue, setLocalValue] = useState(initialValue);

  const progress = useSharedTransition(isTypeof(value, 'boolean') ? value : localValue, {
    duration: 200,
  });

  // func
  const onPress = () => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);

      setLocalValue((v) => !v);
    }
  };

  // style
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: disabled
        ? theme.colors.neutral50
        : interpolateColor(
            progress.value,
            [0, 1],
            [theme.colors.neutral50, theme.colors.primary500]
          ),
      borderColor: disabled
        ? theme.colors.neutral200
        : interpolateColor(
            progress.value,
            [0, 1],
            [theme.colors.primary500, theme.colors.primary500]
          ),
    };
  });

  const iconProps = useAnimatedProps<ImageProps>(() => ({
    tintColor: disabled
      ? theme.colors.neutral200
      : interpolateColor(progress.value, [0, 1], ['transparent', theme.colors.neutral50]),
  }));

  // render
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <AnimatedBox
        justifyContent="center"
        alignItems="center"
        position="relative"
        style={[styles.container(size), containerStyle]}>
        <AnimatedIcon size={16} animatedProps={iconProps} icon="done" />
      </AnimatedBox>
    </TouchableWithoutFeedback>
  );
};

const stylesSheet = makeStyles((theme) => ({
  container: (size: number) => ({
    borderRadius: theme.spacing.xs_4,
    borderWidth: 1,
    height: size,
    width: size,
  }),
}));
