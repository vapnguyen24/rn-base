import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormDatePickerField } from './form-date-picker-field';

type WrapperProps = {
  label?: string;
  description?: string;
  isDisabled?: boolean;
  withError?: boolean;
  presentation?: 'bottom-sheet' | 'dialog';
};

function Wrapper({ label, description, isDisabled, withError, presentation }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { date: undefined } });
  useEffect(() => {
    if (withError) setError('date', { message: 'Please select a valid date' });
  }, [withError, setError]);
  return (
    <FormDatePickerField
      control={control}
      name="date"
      label={label}
      description={description}
      isDisabled={isDisabled}
      presentation={presentation}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormDatePickerField',
  component: Wrapper,
  args: {
    label: 'Date',
    description: undefined,
    presentation: 'bottom-sheet',
    isDisabled: false,
    withError: false,
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultWithDialog: Story = {
  args: { presentation: 'dialog' },
};

export const WithDescription: Story = {
  args: { description: 'Select your appointment date' },
};

export const WithError: Story = {
  args: { withError: true },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};
