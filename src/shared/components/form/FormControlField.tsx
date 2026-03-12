import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { ControlField, Label, Description, FieldError } from 'heroui-native';
import type { ViewProps } from 'react-native';

type ControlVariant = 'switch' | 'checkbox' | 'radio';

interface FormControlFieldProps<TFieldValues extends FieldValues>
  extends Omit<ViewProps, 'children'> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  variant?: ControlVariant;
}

export function FormControlField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  variant = 'switch',
  ...rest
}: FormControlFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <ControlField
          isSelected={!!value}
          onSelectedChange={onChange}
          isInvalid={!!error}
          {...rest}
        >
          {(label || description) && (
            <React.Fragment>
              {label ? <Label className="flex-1">{label}</Label> : null}
              {description ? <Description>{description}</Description> : null}
            </React.Fragment>
          )}
          <ControlField.Indicator variant={variant} />
          {error ? <FieldError>{error.message}</FieldError> : null}
        </ControlField>
      )}
    />
  );
}
