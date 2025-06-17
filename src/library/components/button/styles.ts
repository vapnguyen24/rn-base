import { makeStyles, Theme } from '~/src/theme';

export const buttonStyleSheet = makeStyles((theme) => ({
  buttonColor: (disabled?: boolean, borderColor: keyof Theme['colors'] = 'primary500') => ({
    backgroundColor: disabled ? theme.colors.neutral200 : theme.colors.neutral50,
    borderColor: disabled ? theme.colors.neutral200 : theme.colors?.[borderColor],
  }),
  extraSmall: {
    alignItems: 'center',
    borderRadius: 8,
    columnGap: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 8,
  },
  normal: {
    alignItems: 'center',
    borderRadius: 8,
    columnGap: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 12,
  },
  large: {
    alignItems: 'center',
    borderRadius: 10,
    columnGap: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 16,
  },
  outline: {
    borderWidth: 1,
  },
  small: {
    alignItems: 'center',
    borderRadius: 8,
    columnGap: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 10,
  },
  textColor: (disabled?: boolean) => ({
    color: disabled ? theme.colors.neutral200 : theme.colors.neutral50,
  }),
  text_extraSmall: theme.textVariants.extraSmall,
  text_normal: theme.textVariants.CTAs,
  text_small: theme.textVariants.CTAs,
  text_large: theme.textVariants.CTAs,
}));
