import React from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormSliderField } from './form-slider-field';

type WrapperProps = {
  label?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  showOutput?: boolean;
};

function Wrapper({ label, minValue, maxValue, step, showOutput }: WrapperProps) {
  const { control } = useForm({ defaultValues: { field: 50 } });
  return (
    <FormSliderField
      control={control}
      name="field"
      label={label}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      showOutput={showOutput}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormSliderField',
  component: Wrapper,
  args: {
    label: 'Volume',
    minValue: 0,
    maxValue: 100,
    step: 1,
    showOutput: true,
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoLabel: Story = {
  args: { label: undefined },
};

export const CustomRange: Story = {
  args: { label: 'Price', minValue: 100, maxValue: 10000, step: 100 },
};

export const HideOutput: Story = {
  args: { showOutput: false },
};
