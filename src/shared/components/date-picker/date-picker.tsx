import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react-native';
import {
  BottomSheet,
  Dialog,
  Label,
  FieldError,
  Description,
  TextField,
  useThemeColor,
} from 'heroui-native';
import { dateToString, stringToDate } from '@shared/utils/date.utils';
import { Calendar } from './calendar';
import { DateSegmentInput } from './date-segment-input';

// ─── Props ────────────────────────────────────────────────────────────────────

interface DatePickerProps {
  label?: string;
  description?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  isInvalid?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  /** Controls how the calendar overlay is presented. @default 'bottom-sheet' */
  presentation?: 'bottom-sheet' | 'dialog';
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DatePicker({
  label,
  description,
  value,
  onChange,
  isInvalid = false,
  isDisabled = false,
  errorMessage,
  presentation = 'bottom-sheet',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [_accentColor, dangerColor, mutedColor] = useThemeColor([
    'accent',
    'danger',
    'muted',
  ]) as string[];

  const iconColor = isInvalid ? dangerColor : mutedColor;

  const handleStringChange = (str: string) => {
    onChange(stringToDate(str));
  };

  const handleDateChange = (date: Date | undefined) => {
    onChange(date);
    if (date) setIsOpen(false);
  };

  const input = (trigger: React.ReactNode) => (
    <TextField isInvalid={isInvalid} isDisabled={isDisabled}>
      {label ? <Label>{label}</Label> : null}
      <DateSegmentInput
        value={dateToString(value)}
        onChange={handleStringChange}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isReadOnly
        trailingIcon={trigger}
      />
      {description && !errorMessage ? <Description>{description}</Description> : null}
      {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
    </TextField>
  );

  const calendar = <Calendar value={value} onChange={handleDateChange} />;

  if (presentation === 'dialog') {
    return (
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        {input(
          <Dialog.Trigger asChild>
            <CalendarDays size={20} color={iconColor} />
          </Dialog.Trigger>,
        )}
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>{calendar}</Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    );
  }

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      {input(
        <BottomSheet.Trigger asChild>
          <CalendarDays size={20} color={iconColor} />
        </BottomSheet.Trigger>,
      )}
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>{calendar}</BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
