import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormRadioGroupField } from './form-radio-group-field';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const PLAN_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

type WrapperProps = {
  label?: string;
  withError?: boolean;
  optionSet?: 'gender' | 'plan';
};

function Wrapper({ label, withError, optionSet = 'gender' }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { field: '' } });
  useEffect(() => {
    if (withError) setError('field', { message: 'Please select an option' });
  }, [withError, setError]);
  return (
    <FormRadioGroupField
      control={control}
      name="field"
      label={label}
      options={optionSet === 'plan' ? PLAN_OPTIONS : GENDER_OPTIONS}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormRadioGroupField',
  component: Wrapper,
  args: {
    label: 'Gender',
    withError: false,
    optionSet: 'gender',
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { withError: true },
};

export const PlanOptions: Story = {
  args: { label: 'Select a plan', optionSet: 'plan' },
};
