import React from 'react';
import { View, Text } from 'react-native';
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
import { dateToString } from '@shared/utils/date.utils';
import type { DateRange } from '@shared/utils/date.utils';
import { RangeCalendar } from './range-calendar';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRange(start?: Date, end?: Date): string {
  const s = start ? dateToString(start) : 'mm/dd/yyyy';
  const e = end ? dateToString(end) : 'mm/dd/yyyy';
  return `${s}  —  ${e}`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface DateRangePickerProps {
  label?: string;
  description?: string;
  value?: DateRange;
  onChange: (range: DateRange) => void;
  isInvalid?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  /** Controls how the calendar overlay is presented. @default 'bottom-sheet' */
  presentation?: 'bottom-sheet' | 'dialog';
}

// ─── Sub-component: trigger input ─────────────────────────────────────────────

function RangeInput({
  value,
  trigger,
  isInvalid = false,
  isDisabled = false,
}: {
  value?: DateRange;
  trigger: React.ReactNode;
  isInvalid?: boolean;
  isDisabled?: boolean;
}) {
  const [_accentColor, mutedColor, fieldPlaceholder] = useThemeColor([
    'accent',
    'danger',
    'muted',
    'field-placeholder',
  ]) as string[];

  const hasValue = value?.start || value?.end;
  const borderClass = isInvalid ? 'border-danger' : 'border-field';

  return (
    <View
      className={`flex-row items-center rounded-2xl border-2 bg-field ios:shadow-field android:shadow-sm ${borderClass} ${isDisabled ? 'opacity-disabled' : ''}`}
    >
      <Text
        className="flex-1 font-normal text-base py-3.5 pl-3"
        style={{ color: hasValue ? mutedColor : fieldPlaceholder }}
        numberOfLines={1}
      >
        {formatRange(value?.start, value?.end)}
      </Text>
      <View className="pr-3">{trigger}</View>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DateRangePicker({
  label,
  description,
  value,
  onChange,
  isInvalid = false,
  isDisabled = false,
  errorMessage,
  presentation = 'bottom-sheet',
}: DateRangePickerProps) {
  const [_accent, dangerColor, mutedColor] = useThemeColor([
    'accent',
    'danger',
    'muted',
  ]) as string[];

  const iconColor = isInvalid ? dangerColor : mutedColor;

  const field = (trigger: React.ReactNode) => (
    <TextField isInvalid={isInvalid} isDisabled={isDisabled}>
      {label ? <Label>{label}</Label> : null}
      <RangeInput
        value={value}
        trigger={trigger}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      />
      {description && !errorMessage ? <Description>{description}</Description> : null}
      {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
    </TextField>
  );

  const calendar = <RangeCalendar value={value} onChange={onChange} />;

  if (presentation === 'dialog') {
    return (
      <Dialog>
        {field(
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
    <BottomSheet>
      {field(
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
