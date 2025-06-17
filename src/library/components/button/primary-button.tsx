import { backgroundColor, useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { TouchableWithoutFeedback } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';

import { useThrottle } from './hook';
import { ButtonProps, PrimaryButtonProps } from './type';

import { buttonStyleSheet } from '~/src/library/components/button/styles';
import { AnimatedBox } from '~/src/library/components/core';
import { Text } from '~/src/library/components/core/Text';
import { Icon } from '~/src/library/components/icon';
import { Theme } from '~/src/theme';

export const PrimaryButton = ({
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
  backgroundColor: bgColor = 'primary500',
  backgroundColorPressed = 'primary',
  backgroundColorDisabled = 'neutral100',
  ...rest
}: ButtonProps & PrimaryButtonProps) => {
  // state

  const theme = useTheme<Theme>();

  const [t] = useTranslation();

  const styles = buttonStyleSheet();

  const [, handlePress, handleLongPress, handlePressIn, handlePressOut, pressed] = useThrottle({
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    throttleMs,
  });

  // func
  const iconColor: keyof Theme['colors'] = disabled ? 'neutral200' : 'neutral50';

  // style
  const containerStyle = useAnimatedStyle(() => {
    let backgroundColor: string = theme.colors?.[bgColor];
    if (disabled) {
      backgroundColor = theme.colors?.[backgroundColorDisabled];
    } else if (pressed.value) {
      backgroundColor = theme.colors?.[backgroundColorPressed];
    }

    return {
      backgroundColor,
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
      <AnimatedBox
        alignItems="center"
        justifyContent="center"
        style={[styles[size], containerStyle]}>
        {leftIcon ? <Icon colors={iconColor} icon={leftIcon} /> : null}
        <Text numberOfLines={1} style={[styles[`text_${size}`], styles.textColor(disabled)]}>
          {t18n ? t(t18n) : text}
        </Text>
        {rightIcon ? <Icon colors={iconColor} icon={rightIcon} /> : null}
      </AnimatedBox>
    </TouchableWithoutFeedback>
  );
};
