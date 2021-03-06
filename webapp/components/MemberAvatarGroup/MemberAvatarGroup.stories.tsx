import React from 'react';
import { host } from 'storybook-host';
import MemberAvatarGroup from './MemberAvatarGroup';

const Host = host({
  align: 'center middle',
  background: true,
  backdrop: true
});

const fakeMembersList = [
  { id: 1, name: 'Mohamed Aymmen Hammemi', picture: 'https://ca.slack-edge.com/T1EHPUWM8-UCWDN1KHA-2b0596fbe248-512' },
  { id: 2, name: 'Fakher Gh', picture: 'https://ca.slack-edge.com/T1EHPUWM8-UFWL9UUF3-5cbfb7d112af-512' },
  { id: 3, name: 'Hamdi Gatri', picture: 'https://ca.slack-edge.com/T1EHPUWM8-U7TMLMR8B-8a8f4e4791a7-512' }
];
export const Default = () => <MemberAvatarGroup list={fakeMembersList} maxItems={3} />;
export const Large = () => <MemberAvatarGroup list={fakeMembersList} maxItems={3} avatarSize="large" />;
export const HiddenElements = () => (
  <MemberAvatarGroup
    list={[
      ...fakeMembersList,
      { id: 4, name: 'Mustafa Mokrani' },
      { id: 5, name: 'Houssem Jelitti' },
      { id: 6, name: 'Ala Douagi' }
    ]}
    maxItems={4}
    avatarSize="large"
  />
);

export default {
  title: 'MemberAvatarGroup',
  decorators: [Host]
};
