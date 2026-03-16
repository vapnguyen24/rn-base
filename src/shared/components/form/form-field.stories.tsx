import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormField } from './form-field';

type WrapperProps = {
  label?: string;
  placeholder?: string;
  withError?: boolean;
  disabled?: boolean;
};

function Wrapper({ label, placeholder, withError, disabled }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { field: '' } });
  useEffect(() => {
    if (withError) setError('field', { message: 'This field is required' });
  }, [withError, setError]);
  return (
    <FormField
      control={control}
      name="field"
      label={label}
      placeholder={placeholder}
      editable={!disabled}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormField',
  component: Wrapper,
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    withError: false,
    disabled: false,
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { withError: true },
};

export const NoLabel: Story = {
  args: { label: undefined, placeholder: 'Search...' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
