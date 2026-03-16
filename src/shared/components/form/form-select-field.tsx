import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Select, Label, FieldError, TextField } from 'heroui-native';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  presentation?: 'popover' | 'bottom-sheet' | 'dialog';
}

export function FormSelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select an option',
  options,
  presentation = 'popover',
}: FormSelectFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField isInvalid={!!error}>
          {label ? <Label>{label}</Label> : null}
          <Select
            presentation={presentation}
            value={value ? { value, label: options.find(o => o.value === value)?.label ?? value } : undefined}
            onValueChange={option => {
              if (option && !Array.isArray(option)) {
                onChange(option.value);
              }
            }}
          >
            <Select.Trigger>
              <Select.Value placeholder={placeholder} />
              <Select.TriggerIndicator />
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay />
              <Select.Content presentation={presentation}>
                {options.map(option => (
                  <Select.Item key={option.value} value={option.value} label={option.label} />
                ))}
              </Select.Content>
            </Select.Portal>
          </Select>
          {error ? <FieldError>{error.message}</FieldError> : null}
        </TextField>
      )}
    />
  );
}
