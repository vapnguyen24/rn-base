import { IconTypes } from '~/assets/icon';
import { Theme } from '~/src/theme';

export interface IconProps {
  /**
   * Size of Icon
   * @default 24
   */
  size?: number;

  /**
   * Overwrite tint color with theme
   */
  colors?: keyof Theme['colors'];

  /**
   * Icon type
   * @default undefined
   */
  icon: IconTypes;
}
