/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';

import { StackViewProps } from './type';

export const Stack = forwardRef(({ children, ...rest }: StackViewProps, ref: any) => {
  // render
  return (
    <Animated.ScrollView
      ref={ref}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      {...rest}>
      {children}
    </Animated.ScrollView>
  );
});
