import React from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormOTPField } from './form-otp-field';

type WrapperProps = {
  label?: string;
  maxLength?: number;
  groupSize?: number;
};

function Wrapper({ label, maxLength, groupSize }: WrapperProps) {
  const { control } = useForm({ defaultValues: { field: '' } });
  return (
    <FormOTPField
      control={control}
      name="field"
      label={label}
      maxLength={maxLength}
      groupSize={groupSize}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormOTPField',
  component: Wrapper,
  args: {
    label: 'Verification Code',
    maxLength: 6,
    groupSize: 3,
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FourDigits: Story = {
  args: { label: 'PIN', maxLength: 4, groupSize: 4 },
};

export const SingleGroup: Story = {
  args: { groupSize: 6 },
};
