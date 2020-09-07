import React from 'react';
import { host } from 'storybook-host';
import Tag from './Tag';

const Host = host({
  align: 'center middle',
  background: true,
  backdrop: true
});

export const Default = () => <Tag name="API" />;
export const Colored = () => <Tag name="API" color="green" />;

export default {
  title: 'Tag',
  decorators: [Host]
};
