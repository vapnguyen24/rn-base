import { Box } from '~/src/library/components/core/Box';
import { ListTileProps } from './type';
import { Text } from '~/src/library/components/core/Text';
import { useTranslation } from 'react-i18next';

export const ListTile = ({
  leading,
  trailing,
  label = '',
  content,
  labelProps,
  contentProps,
  containerProps,
  containerAlignItems,
  label18n,
  content18n
}: ListTileProps) => {

    const {t} = useTranslation()

  return (
    <Box
      flexDirection="row"
      gap="m_16"
      alignItems={containerAlignItems ?? 'center'}
      {...containerProps}>
      {!!leading ? leading : null}
      <Box flex={1}>
        <Text variant="paragraph1" {...labelProps}>
          {label18n ? t(label18n) : label}
        </Text>
        {!!content ? (
          <Text variant="paragraph2" marginTop='s_8' {...contentProps}>
            {content18n ? t(content18n) :content}
          </Text>
        ) : null}
      </Box>
      {!!trailing ? trailing : null}
    </Box>
  );
};
