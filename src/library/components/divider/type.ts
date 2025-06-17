import { Theme } from '~/src/theme';

export interface DividerProps {
  /**
   * Overwrite color with theme
   */
  colors?: keyof Theme['colors'];

  /**
   * Height of divider
   * @default 1
   */
  height?: number;
}
