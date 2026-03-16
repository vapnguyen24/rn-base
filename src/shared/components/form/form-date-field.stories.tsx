import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormDateField } from './form-date-field';

type WrapperProps = {
  label?: string;
  description?: string;
  isDisabled?: boolean;
  withError?: boolean;
};

function Wrapper({ label, description, isDisabled, withError }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { field: '' } });
  useEffect(() => {
    if (withError) setError('field', { message: 'Please enter a valid date' });
  }, [withError, setError]);
  return (
    <FormDateField
      control={control}
      name="field"
      label={label}
      description={description}
      isDisabled={isDisabled}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormDateField',
  component: Wrapper,
  args: {
    label: 'Date of Birth',
    description: undefined,
    isDisabled: false,
    withError: false,
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Enter your birth date (MM/DD/YYYY)' },
};

export const WithError: Story = {
  args: { withError: true },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};
