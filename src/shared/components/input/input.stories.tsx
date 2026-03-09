import type { Meta, StoryObj } from '@storybook/react-native';
import { Input } from './index';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    error: 'Password is required',
  },
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    placeholder: 'Search...',
  },
};
