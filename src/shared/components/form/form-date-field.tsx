import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { TextField, Label, FieldError, Description } from 'heroui-native';
import { DateSegmentInput } from '@shared/components/date-picker';

interface FormDateFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  isDisabled?: boolean;
}

export function FormDateField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  isDisabled = false,
}: FormDateFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField isInvalid={!!error} isDisabled={isDisabled}>
          {label ? <Label>{label}</Label> : null}
          <DateSegmentInput
            value={value ?? ''}
            onChange={onChange}
            isInvalid={!!error}
            isDisabled={isDisabled}
          />
          {description && !error ? <Description>{description}</Description> : null}
          {error ? <FieldError>{error.message}</FieldError> : null}
        </TextField>
      )}
    />
  );
}
