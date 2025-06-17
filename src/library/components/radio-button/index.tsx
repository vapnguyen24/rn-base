import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { RadioButtonProps } from './type';

import { useSharedTransition } from '~/src/common/animated';
import { AnimatedBox } from '~/src/library/components/core';
import { makeStyles } from '~/src/theme';

export const RadioButton = ({
  value,
  onToggle,
  size = 24,
  disabled = false,
  initialValue = false,
}: RadioButtonProps) => {
  // state
  const styles = stylesSheet();

  const [localValue, setLocalValue] = useState(initialValue);

  const progress = useSharedTransition(isTypeof(value, 'boolean') ? value : localValue, {
    duration: 200,
  });

  // function
  const onPress = () => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);

      setLocalValue((v) => !v);
    }
  };

  // style
  const dotStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0, 1]) }],
  }));

  // render
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <AnimatedBox
        alignItems="center"
        justifyContent="center"
        position="relative"
        style={styles.container(size, disabled)}>
        <AnimatedBox
          alignSelf="center"
          position="absolute"
          pointerEvents="none"
          style={[styles.dot(size, disabled), dotStyle]}
        />
      </AnimatedBox>
    </TouchableWithoutFeedback>
  );
};

const stylesSheet = makeStyles((theme) => ({
  container: (size: number, disabled?: boolean) => ({
    backgroundColor: theme.colors.neutral50,
    borderColor: disabled ? theme.colors.neutral200 : theme.colors.primary500,
    borderRadius: size,
    borderWidth: 1,
    height: size,
    width: size,
  }),
  dot: (size: number, disabled: boolean) => {
    return {
      backgroundColor: disabled ? theme.colors.neutral200 : theme.colors.primary500,
      borderRadius: size / 4,
      height: size / 2,
      width: size / 2,
    };
  },
}));
