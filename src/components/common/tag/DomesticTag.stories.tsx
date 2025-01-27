import { Meta, StoryObj } from '@storybook/react';
import DomesticTag from './DomesticTag';

const meta = {
  title: 'Components/Common/tag',
  component: DomesticTag,
  tags: ['autodocs'],
  argTypes: {
    isDomestic: {
      control: 'boolean',
      description: '여행 타입을 설정합니다. true는 국내, false는 해외입니다.',
    },
  },
} satisfies Meta<typeof DomesticTag>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: { isDomestic: boolean }) => (
  <div className="flex gap-3">
    <DomesticTag {...args} isDomestic />
    <DomesticTag {...args} isDomestic={false} />
  </div>
);

export const AllVariants: Story = {
  render: Template,
  args: {
    isDomestic: true,
  },
};
