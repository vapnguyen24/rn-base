import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';
import { useAnimatedProps, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import { useThrottle } from './hook';
import { buttonStyleSheet } from './styles';
import { ButtonProps, OutlineButtonProps } from './type';

import { AnimatedText } from '~/src/library/components/core';
import { Box } from '~/src/library/components/core/Box';
import { AnimatedIcon } from '~/src/library/components/icon';
import { Theme } from '~/src/theme';

export const OutlineButton = ({
  t18n,
  text,
  throttleMs,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  leftIcon,
  rightIcon,
  size = 'normal',
  disabled = false,
  textColor = 'primary500',
  textColorPressed = 'primary',
  borderColor = 'primary500',
  ...rest
}: ButtonProps & OutlineButtonProps) => {
  // state
  const theme = useTheme<Theme>();
  const styles = buttonStyleSheet();

  const [t] = useTranslation();

  const [, handlePress, handleLongPress, handlePressIn, handlePressOut, pressed] = useThrottle({
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    throttleMs,
  });

  const tintColor = useDerivedValue(() => {
    if (disabled) {
      return theme.colors.neutral100;
    }

    if (pressed.value) {
      return theme.colors?.[textColorPressed];
    }

    return theme.colors?.[textColor];
  });

  // style
  const textStyle = useAnimatedStyle(() => {
    return {
      color: tintColor.value,
    };
  });

  // props
  const iconProps = useAnimatedProps<ImageProps>(() => {
    return {
      tintColor: tintColor.value,
    };
  });

  // render
  return (
    <TouchableWithoutFeedback
      {...rest}
      disabled={disabled}
      onLongPress={handleLongPress}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Box
        alignItems="center"
        justifyContent="center"
        style={[styles[size], styles.buttonColor(disabled, borderColor), styles.outline]}>
        {leftIcon ? <AnimatedIcon animatedProps={iconProps} icon={leftIcon} /> : null}
        <AnimatedText numberOfLines={1} style={[styles[`text_${size}`], textStyle]}>
          {t18n ? t(t18n) : text}
        </AnimatedText>
        {rightIcon ? <AnimatedIcon animatedProps={iconProps} icon={rightIcon} /> : null}
      </Box>
    </TouchableWithoutFeedback>
  );
};
