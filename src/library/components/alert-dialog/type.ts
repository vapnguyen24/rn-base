import { ReactElement } from 'react';
import { TextProps } from 'react-native';
import { ModalProps } from '~/src/library/components/modal/type';

export interface AlertDialogProps extends ModalProps, AlertContentProps {
  setVisible?: (val: boolean) => void;
  labelProps?: TextProps;
  contentProps?: TextProps;
  renderComponent?: ({
    label,
    content,
    confirmText,
    cancelText,
    onConfirmPress,
    onCancelPress,
  }: AlertContentProps) => ReactElement;
}

interface AlertContentProps {
  label?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirmPress?: () => void;
  onCancelPress?: () => void;

  labelI18n?: I18nKeys,
  contentI18n?: I18nKeys;
  confirmTextI18n?: I18nKeys;
  cancelTextI18n?: I18nKeys;
}
