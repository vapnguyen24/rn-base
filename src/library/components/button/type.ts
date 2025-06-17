import React from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';

import { IconTypes } from '~/assets/icon';
import { Theme } from '~/src/theme';

export type ButtonProps = RequireAtLeastOne<
  {
    /**
     * Button size
     * @default normal
     */
    size?: 'normal' | 'small' | 'extraSmall' | 'large';

    /**
     * Children for button
     * @default undefined
     */
    children?: React.ReactNode;

    /**
     * Left Icon
     */
    leftIcon?: IconTypes;

    /**
     * Right Icon
     */
    rightIcon?: IconTypes;

    /**
     * Disable button when press
     */
    throttleMs?: number;

    text: string;

    t18n: I18nKeys;
  },
  't18n' | 'text'
> &
  TouchableWithoutFeedbackProps;

export type PrimaryButtonProps = {
  backgroundColor?: keyof Theme['colors']
  backgroundColorPressed?: keyof Theme['colors']
  backgroundColorDisabled?: keyof Theme['colors']
}

export type OutlineButtonProps = {
  borderColor?: keyof Theme['colors']
  textColor?: keyof Theme['colors']
  textColorPressed?: keyof Theme['colors']
}