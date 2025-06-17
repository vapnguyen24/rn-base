import { AlertDialogProps } from '~/src/library/components/alert-dialog/type';
import { Box } from '~/src/library/components/core/Box';
import { Text } from '~/src/library/components/core/Text';
import { Modal } from '~/src/library/components/modal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/src/library/components/button/primary-button';
import { OutlineButton } from '~/src/library/components/button/outline-button';
import { DefaultButton } from '~/src/library/components/button/default-button';

export const AlertDialog = ({
  setVisible,
  renderComponent,
  label,
  content,
  confirmText,
  cancelText,
  onConfirmPress,
  onCancelPress,
  labelProps,
  contentProps,
  labelI18n,
  contentI18n,
  confirmTextI18n = 'dialog:confirm',
  cancelTextI18n = 'dialog:cancel',
  ...rest
}: AlertDialogProps) => {
  const { t } = useTranslation();

  const handleCloseDialog = () => setVisible?.(false);
  return (
    <Modal {...rest}>
      {!!renderComponent ? (
        renderComponent({
          label,
          content,
          confirmText,
          cancelText,
          onConfirmPress,
          onCancelPress,
          contentI18n,
          labelI18n,
          confirmTextI18n,
          cancelTextI18n,
        })
      ) : (
        <Box padding="sm_12" borderRadius="l_12" marginHorizontal="m_16" backgroundColor='neutral50'>
          <Box flexDirection="row" gap="m_16" alignItems="center">
            <Text variant="subtitle1" flex={1} {...labelProps}>
              {labelI18n ? t(labelI18n) : label}
            </Text>
            <DefaultButton onPress={handleCloseDialog}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </DefaultButton>
          </Box>

          {/* content */}
          <Text variant="paragraph2" marginTop="ml_24" {...contentProps} maxWidth="90%">
            {contentI18n ? t(contentI18n) : content}
          </Text>

          {/* button */}
          <Box flexDirection="row" alignItems="center" gap="sm_12" marginTop='xl_64'>
            <Box flex={1}>
              <PrimaryButton t18n={confirmTextI18n} text={confirmText} onPress={onConfirmPress}  size='large'/>
            </Box>

            <Box flex={1}>
              <OutlineButton t18n={cancelTextI18n} text={cancelText} onPress={onCancelPress}  size='large'/>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );
};
