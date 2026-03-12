import React from 'react';
import {
  TextField,
  Label,
  Input as HeroInput,
  FieldError,
} from 'heroui-native';
import type { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <TextField isInvalid={!!error}>
      {label ? <Label>{label}</Label> : null}
      <HeroInput {...rest} />
      {error ? <FieldError>{error}</FieldError> : null}
    </TextField>
  );
}
