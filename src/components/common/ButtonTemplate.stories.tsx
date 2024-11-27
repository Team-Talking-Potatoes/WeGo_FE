/* eslint-disable import/no-extraneous-dependencies */
import { Meta, StoryObj } from '@storybook/react';
import { ButtonTemplate } from './ButtonTemplate';

const meta = {
  title: 'Components/Common/ButtonTemplate',
  component: ButtonTemplate,
  tags: ['autodocs'],
  argTypes: {
    handler: { action: 'clicked' },
  },
} satisfies Meta<typeof ButtonTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: 'Default Button',
    size: 'default',
    variant: 'default',
    error: false,
    // eslint-disable-next-line no-alert
    handler: () => alert('Button clicked!'),
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    label: 'Disabled Button',
    error: true,
  },
} satisfies Story;

export const Small = {
  args: {
    ...Default.args,
    label: 'Small Button',
    size: 'sm',
  },
} satisfies Story;

export const Large = {
  args: {
    ...Default.args,
    label: 'Large Button',
    size: 'lg',
  },
} satisfies Story;
