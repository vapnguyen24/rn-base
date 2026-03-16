import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormDateRangePickerField } from './form-date-range-picker-field';

type WrapperProps = {
  label?: string;
  description?: string;
  isDisabled?: boolean;
  withError?: boolean;
  presentation?: 'bottom-sheet' | 'dialog';
};

function Wrapper({ label, description, isDisabled, withError, presentation }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { dateRange: undefined } });
  useEffect(() => {
    if (withError) setError('dateRange', { message: 'Please select a valid date range' });
  }, [withError, setError]);
  return (
    <FormDateRangePickerField
      control={control}
      name="dateRange"
      label={label}
      description={description}
      isDisabled={isDisabled}
      presentation={presentation}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormDateRangePickerField',
  component: Wrapper,
  args: {
    label: 'Date Range',
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
  args: { description: 'Select a start and end date' },
};

export const WithError: Story = {
  args: { withError: true },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};
