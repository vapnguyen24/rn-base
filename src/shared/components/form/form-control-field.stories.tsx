import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormControlField } from './form-control-field';

type WrapperProps = {
  label?: string;
  description?: string;
  variant?: 'switch' | 'checkbox' | 'radio';
  withError?: boolean;
};

function Wrapper({ label, description, variant, withError }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { field: false } });
  useEffect(() => {
    if (withError) setError('field', { message: 'You must accept the terms' });
  }, [withError, setError]);
  return (
    <FormControlField
      control={control}
      name="field"
      label={label}
      description={description}
      variant={variant}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormControlField',
  component: Wrapper,
  args: {
    label: 'Enable notifications',
    description: undefined,
    variant: 'switch',
    withError: false,
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Switch: Story = {};

export const Checkbox: Story = {
  args: { label: 'I agree to the terms', variant: 'checkbox' },
};

export const Radio: Story = {
  args: { label: 'Select this option', variant: 'radio' },
};

export const WithDescription: Story = {
  args: { description: 'Receive push notifications on your device' },
};

export const WithError: Story = {
  args: { label: 'Accept terms', variant: 'checkbox', withError: true },
};
