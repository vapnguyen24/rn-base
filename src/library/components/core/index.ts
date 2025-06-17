import Animated from 'react-native-reanimated';

import { Box } from '~/src/library/components/core/Box';
import { Text } from '~/src/library/components/core/Text';

export const AnimatedBox = Animated.createAnimatedComponent(Box);
export const AnimatedText = Animated.createAnimatedComponent(Text);
