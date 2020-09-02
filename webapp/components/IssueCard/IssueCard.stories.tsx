import React from 'react';
import { host } from 'storybook-host';
import IssueCard from './IssueCard';

const Host = host({
  align: 'center middle',
  backdrop: true,
  width: 400
});

const fakeMembersList = [
  { id: 1, name: 'Mohamed Aymmen Hammemi', picture: 'https://ca.slack-edge.com/T1EHPUWM8-UCWDN1KHA-2b0596fbe248-512' },
  { id: 2, name: 'Fakher Gh', picture: 'https://ca.slack-edge.com/T1EHPUWM8-UFWL9UUF3-5cbfb7d112af-512' },
  { id: 3, name: 'Hamdi Gatri', picture: 'https://ca.slack-edge.com/T1EHPUWM8-U7TMLMR8B-8a8f4e4791a7-512' }
];

const onClick = () => {
  console.log('clicked');
};

export const Default = () => (
  <IssueCard id={1} summary="new task" tags={['webApp', 'Api', 'DB']} assignedTo={fakeMembersList} onClick={onClick} />
);

export const MoreMembers = () => (
  <IssueCard
    id={1}
    summary="new task"
    tags={['webApp', 'Api', 'DB']}
    assignedTo={[...fakeMembersList, { id: 11, name: 'Mustafa Mokrani' }, { id: 12, name: 'Houssem Jelitti' }]}
    onClick={onClick}
  />
);

export const NoTags = () => <IssueCard id={1} summary="new task" assignedTo={fakeMembersList} onClick={onClick} />;

export const NotAssigned = () => <IssueCard id={1} summary="new task" onClick={onClick} />;

export const WithTagsButNotAssigned = () => (
  <IssueCard id={1} summary="new task" tags={['webApp', 'Api', 'DB']} onClick={onClick} />
);
export default {
  title: 'IssueCard',
  decorators: [Host]
};
