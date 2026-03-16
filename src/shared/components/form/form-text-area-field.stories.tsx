import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormTextAreaField } from './form-text-area-field';

type WrapperProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  withError?: boolean;
};

function Wrapper({ label, description, placeholder, withError }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { field: '' } });
  useEffect(() => {
    if (withError) setError('field', { message: 'This field is required' });
  }, [withError, setError]);
  return (
    <FormTextAreaField
      control={control}
      name="field"
      label={label}
      description={description}
      placeholder={placeholder}
      numberOfLines={4}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormTextAreaField',
  component: Wrapper,
  args: {
    label: 'Bio',
    description: 'Tell us about yourself',
    placeholder: 'Write something...',
    withError: false,
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { withError: true, description: undefined },
};

export const NoLabel: Story = {
  args: { label: undefined, description: undefined },
};
