import { createBox } from '@shopify/restyle';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Theme } from '~/src/theme';

export const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);
