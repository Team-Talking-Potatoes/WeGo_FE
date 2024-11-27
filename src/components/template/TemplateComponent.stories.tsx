/* eslint-disable import/no-extraneous-dependencies */
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import TemplateComponent from './TemplateComponent';

const meta: Meta = {
  title: 'Components/TemplateComponent',
  component: TemplateComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof TemplateComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithUserInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole('textbox');

    await userEvent.type(input, 'Hello', { delay: 100 });

    const button = canvas.getByRole('button', { name: /Click me/i });
    await userEvent.click(button);

    await waitFor(() => expect(canvas.getByText(/Hello/)).toBeInTheDocument());
  },
};
