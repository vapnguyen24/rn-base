import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { Input } from '@shared/components/input';

interface FormFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
}

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: FormFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
}
