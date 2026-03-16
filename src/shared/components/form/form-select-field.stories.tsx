import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormSelectField } from './form-select-field';

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'jp', label: 'Japan' },
];

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

type WrapperProps = {
  label?: string;
  placeholder?: string;
  presentation?: 'popover' | 'bottom-sheet' | 'dialog';
  withError?: boolean;
  optionSet?: 'countries' | 'roles';
};

function Wrapper({ label, placeholder, presentation, withError, optionSet = 'countries' }: WrapperProps) {
  const { control, setError } = useForm({ defaultValues: { field: '' } });
  useEffect(() => {
    if (withError) setError('field', { message: 'Please select an option' });
  }, [withError, setError]);
  return (
    <FormSelectField
      control={control}
      name="field"
      label={label}
      placeholder={placeholder}
      options={optionSet === 'roles' ? ROLE_OPTIONS : COUNTRY_OPTIONS}
      presentation={presentation}
    />
  );
}

const meta = {
  title: 'Shared/Form/FormSelectField',
  component: Wrapper,
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    presentation: 'popover',
    withError: false,
    optionSet: 'countries',
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BottomSheet: Story = {
  args: { presentation: 'bottom-sheet' },
};

export const Dialog: Story = {
  args: { presentation: 'dialog' },
};

export const WithError: Story = {
  args: { withError: true },
};

export const DifferentOptions: Story = {
  args: { label: 'Role', placeholder: 'Select a role', optionSet: 'roles' },
};
