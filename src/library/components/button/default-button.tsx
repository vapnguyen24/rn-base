import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useThrottle } from './hook';
import { ButtonProps } from './type';

export const DefaultButton = ({
  throttleMs,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  children,
  ...rest
}: TouchableOpacityProps & Pick<ButtonProps, 'throttleMs'>) => {
  const [, handlePress, handleLongPress, handlePressIn, handlePressOut] = useThrottle({
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    throttleMs,
  });

  return (
    <TouchableOpacity
      {...rest}
      onLongPress={handleLongPress}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      {children}
    </TouchableOpacity>
  );
};
