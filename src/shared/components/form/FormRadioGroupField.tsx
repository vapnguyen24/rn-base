import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { RadioGroup} from 'heroui-native/radio-group';
import { Label } from 'heroui-native/label';
import { FieldError } from 'heroui-native/field-error';

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  options: RadioOption[];
}

export function FormRadioGroupField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormRadioGroupFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <RadioGroup
          value={value}
          onValueChange={onChange}
          isInvalid={!!error}
        >
          {label ? <Label>{label}</Label> : null}
          {options.map(option => (
            <RadioGroup.Item key={option.value} value={option.value}>
              {option.label}
            </RadioGroup.Item>
          ))}
          {error ? <FieldError>{error.message}</FieldError> : null}
        </RadioGroup>
      )}
    />
  );
}
