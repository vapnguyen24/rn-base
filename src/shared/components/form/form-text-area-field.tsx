import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { TextField, Label, TextArea, FieldError, Description } from 'heroui-native';
import type { TextInputProps } from 'react-native';

interface FormTextAreaFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
}

export function FormTextAreaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  ...rest
}: FormTextAreaFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <TextField isInvalid={!!error}>
          {label ? <Label>{label}</Label> : null}
          <TextArea value={value} onChangeText={onChange} onBlur={onBlur} {...rest} />
          {description ? <Description>{description}</Description> : null}
          {error ? <FieldError>{error.message}</FieldError> : null}
        </TextField>
      )}
    />
  );
}
