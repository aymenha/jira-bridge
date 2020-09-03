import React from 'react';
import { host } from 'storybook-host';
import IssueCardsColumn from './IssueCardsColumn';
import { DragDropContext } from 'react-beautiful-dnd';

const Host = host({
  align: 'center middle',
  backdrop: true,
  width: 400
});

const fakeCardsList = [
  {
    id: 1,
    summary: 'task 1',
    tags: ['FrontEnd', 'BackEnd'],
    assignedTo: [
      {
        id: 11,
        name: 'Mohamed Aymmen Hammemi',
        picture: 'https://ca.slack-edge.com/T1EHPUWM8-UCWDN1KHA-2b0596fbe248-512'
      }
    ]
  },
  {
    id: 2,
    summary: 'task 2',
    tags: ['API', 'DB'],
    assignedTo: [
      { id: 12, name: 'Fakher Gh', picture: 'https://ca.slack-edge.com/T1EHPUWM8-UFWL9UUF3-5cbfb7d112af-512' }
    ]
  },
  {
    id: 3,
    summary: 'task 3',
    tags: ['API', 'DB'],
    assignedTo: [
      { id: 13, name: 'Hamdi Gatri', picture: 'https://ca.slack-edge.com/T1EHPUWM8-U7TMLMR8B-8a8f4e4791a7-512' }
    ]
  }
];

export const Default = () => (
  <DragDropContext>
    <IssueCardsColumn title="backlog" list={fakeCardsList} onCreate={() => console.log('** test **')} id={122} />
  </DragDropContext>
);
export const Empty = () => (
  <DragDropContext>
    <IssueCardsColumn id={123} title="in progress" onCreate={() => console.log('create new card clicked')} />
  </DragDropContext>
);
export default {
  title: 'IssueCardsColumn',
  decorators: [Host]
};
