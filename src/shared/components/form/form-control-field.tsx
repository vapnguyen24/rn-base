import React from 'react';
import { View } from 'react-native';
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
          className={error ? 'flex-col items-start gap-1' : undefined}
          {...rest}
        >
          {error ? (
            // Error layout: row wrapping label+indicator, FieldError below
            <>
              <View className="flex-row items-center gap-3 w-full">
                {(label || description) ? (
                  <View className="flex-1">
                    {label ? <Label>{label}</Label> : null}
                    {description ? <Description>{description}</Description> : null}
                  </View>
                ) : null}
                <ControlField.Indicator variant={variant} />
              </View>
              <FieldError>{error.message}</FieldError>
            </>
          ) : (
            // Normal layout: label+description in flex-1, indicator at right
            <>
              {(label || description) ? (
                <View className="flex-1">
                  {label ? <Label>{label}</Label> : null}
                  {description ? <Description>{description}</Description> : null}
                </View>
              ) : null}
              <ControlField.Indicator variant={variant} />
            </>
          )}
        </ControlField>
      )}
    />
  );
}
