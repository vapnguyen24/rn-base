import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { DateRangePicker } from '@shared/components/date-picker';
import type { DateRange } from '@shared/components/date-picker';

interface FormDateRangePickerFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  isDisabled?: boolean;
  presentation?: 'bottom-sheet' | 'dialog';
}

export function FormDateRangePickerField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  isDisabled = false,
  presentation = 'bottom-sheet',
}: FormDateRangePickerFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <DateRangePicker
          label={label}
          description={description}
          value={value as DateRange | undefined}
          onChange={onChange}
          isInvalid={!!error}
          isDisabled={isDisabled}
          errorMessage={error?.message}
          presentation={presentation}
        />
      )}
    />
  );
}
