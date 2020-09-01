import React from 'react';
import { host } from 'storybook-host';
import SprintBoard from './SprintBoard';

const Host = host({
  align: 'center middle',
  width: '100%',
  background: '#f3f4f6',
  backdrop: true
});
const FakeProjectMembers = [
  {
    id: 12,
    name: 'Mohamed Aymmen Hammemi',
    picture: 'https://ca.slack-edge.com/T1EHPUWM8-UCWDN1KHA-2b0596fbe248-512'
  },
  {
    id: 13,
    name: 'Fakher Gh',
    picture: 'https://ca.slack-edge.com/T1EHPUWM8-UFWL9UUF3-5cbfb7d112af-512'
  },
  {
    id: 14,
    name: 'Hamdi Gatri',
    picture: 'https://ca.slack-edge.com/T1EHPUWM8-U7TMLMR8B-8a8f4e4791a7-512'
  }
];
const FakeColumnsList = [
  {
    id: 1,
    title: 'backlog',
    list: [
      { id: 11, summary: 'task in  backlog 1', tags: ['web', 'api'], assignedTo: [{ name: 'Hamdi Gatri', id: 12 }] },
      { id: 12, summary: 'task in  backlog 2', tags: ['web'], assignedTo: [{ name: 'Hamdi Gatri', id: 12 }] }
    ]
  },
  {
    id: 2,
    title: 'inProgress',
    list: [
      {
        id: 21,
        summary: 'task in  progress 01',
        tags: [' api'],
        assignedTo: [
          {
            id: 13,
            name: 'Fakher Gh',
            picture: 'https://ca.slack-edge.com/T1EHPUWM8-UFWL9UUF3-5cbfb7d112af-512'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'completed',
    list: [{ id: 31, summary: 'completed 1', tags: ['DB'], assignedTo: [{ name: 'Mohamed Aymen Hammemi', id: 12 }] }]
  },
  {
    id: 4,
    title: 'InReview',
    list: []
  },
  {
    id: 5,
    title: 'Accepted',
    list: [{ id: 51, summary: 'Accepted task', tags: [], assignedTo: [{ name: 'Mohamed Aymen Hammemi', id: 12 }] }]
  }
];
export const Default = () => <SprintBoard columnsList={FakeColumnsList} projectMembers={FakeProjectMembers} />;
export default {
  title: 'SprintBoard',
  decorators: [Host]
};
