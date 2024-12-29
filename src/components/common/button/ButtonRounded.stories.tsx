import type { Meta } from '@storybook/react';
import ButtonRounded from './ButtonRounded';

export default {
  title: 'Components/Common/ButtonRounded',
  component: ButtonRounded,
} as Meta;

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <ButtonRounded label="Gray" color="gray" />
    <ButtonRounded label="Blue" color="blue" />
    <ButtonRounded label="Default Class" className="custom-class" />
    <ButtonRounded
      label="Conditional Class"
      classNameCondition={{
        'extra-class-1': true,
        'extra-class-2': false,
      }}
    />
  </div>
);
