import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { InputOTP, Label, FieldError, TextField } from 'heroui-native';

interface FormOTPFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  maxLength?: number;
  groupSize?: number;
}

export function FormOTPField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  maxLength = 6,
  groupSize = 3,
}: FormOTPFieldProps<TFieldValues>) {
  const firstGroupSize = Math.ceil(maxLength / 2);
  const secondGroupSize = maxLength - firstGroupSize;
  const groups =
    groupSize < maxLength
      ? [
          Array.from({ length: firstGroupSize }, (_, i) => i),
          Array.from({ length: secondGroupSize }, (_, i) => firstGroupSize + i),
        ]
      : [Array.from({ length: maxLength }, (_, i) => i)];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField isInvalid={!!error}>
          {label ? <Label>{label}</Label> : null}
          <InputOTP value={value} onChange={onChange} maxLength={maxLength}>
            {groups.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {groupIndex > 0 ? <InputOTP.Separator /> : null}
                <InputOTP.Group>
                  {group.map(index => (
                    <InputOTP.Slot key={index} index={index} />
                  ))}
                </InputOTP.Group>
              </React.Fragment>
            ))}
          </InputOTP>
          {error ? <FieldError>{error.message}</FieldError> : null}
        </TextField>
      )}
    />
  );
}
