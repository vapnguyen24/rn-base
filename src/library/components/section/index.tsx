import { ResponsiveValue } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { ViewProps } from 'react-native';
import { Box } from '~/src/library/components/core/Box';
import { Text } from '~/src/library/components/core/Text';
import { Theme } from '~/src/theme';

export interface SectionProps extends ViewProps {
  label?: string;
  t18n?: I18nKeys;
  helper?: string;
  helper18n?: I18nKeys;
  labelColor?: keyof Theme['colors'];
  labelVariant?: ResponsiveValue<
    Exclude<keyof Theme['textVariants'], 'defaults'>,
    {
      phone: number;
      tablet: number;
    }
  >;
  helperColor?: keyof Theme['colors'];
  helperVariant?: ResponsiveValue<
    Exclude<keyof Theme['textVariants'], 'defaults'>,
    {
      phone: number;
      tablet: number;
    }
  >;
}

export const Section = ({
  label,
  t18n,
  labelColor,
  labelVariant = 'CTASmall',
  helper18n,
  helper,
  helperColor = 'danger500',
  helperVariant = 'CTASmall',
  children,
  ...rest
}: SectionProps) => {
  const { t } = useTranslation();
  return (
    <Box gap="s_8" {...rest}>
      {(t18n || label) && (
        <Text variant={labelVariant} color={labelColor}>
          {t18n ? t(t18n) : label}
        </Text>
      )}
      {children}
       {(helper18n || helper) && (
        <Text variant={helperVariant} color={helperColor}>
          {helper18n ? t(helper18n) : helper}
        </Text>
      )}
    </Box>
  );
};
