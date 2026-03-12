import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Slider } from 'heroui-native/slider';
import { Label } from 'heroui-native/label';
import { View } from 'react-native';

interface FormSliderFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  showOutput?: boolean;
}

export function FormSliderField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  minValue = 0,
  maxValue = 100,
  step = 1,
  showOutput = true,
}: FormSliderFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Slider
          value={value}
          onChange={onChange}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
        >
          {(label || showOutput) && (
            <View className="flex-row items-center justify-between mb-1">
              {label ? <Label>{label}</Label> : null}
              {showOutput ? <Slider.Output /> : null}
            </View>
          )}
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      )}
    />
  );
}
