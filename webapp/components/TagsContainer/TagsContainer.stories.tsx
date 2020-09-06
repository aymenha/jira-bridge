import React from 'react';
import { host } from 'storybook-host';
import TagsContainer from './TagsContainer';

const Host = host({
  align: 'center middle',
  background: true,
  backdrop: true
});

export const GeneratedColors = () => <TagsContainer list={['API', 'WebApp', 'DB']} />;

export default {
  title: 'TagsContainer',
  decorators: [Host]
};
