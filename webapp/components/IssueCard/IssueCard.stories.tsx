import React from "react";
import { host } from "storybook-host";
import IssueCard from "./IssueCard";

const Host = host({
  align: "center middle",
  backdrop: true,
  width: 400
});

const fakeMembersList = [
  {
    name: "Mohamed Aymmen Hammemi",
    picture: "https://ca.slack-edge.com/T1EHPUWM8-UCWDN1KHA-2b0596fbe248-512"
  },
  {
    name: "Fakher Gh",
    picture: "https://ca.slack-edge.com/T1EHPUWM8-UFWL9UUF3-5cbfb7d112af-512"
  },
  {
    name: "Hamdi Gatri",
    picture: "https://ca.slack-edge.com/T1EHPUWM8-U7TMLMR8B-8a8f4e4791a7-512"
  }
];
export const Default = () => (
  <IssueCard
    title="new task"
    tags={["webApp", "Api", "DB"]}
    assignedTo={fakeMembersList}
  />
);

export const MoreMembers = () => (
  <IssueCard
    title="new task"
    tags={["webApp", "Api", "DB"]}
    assignedTo={[
      ...fakeMembersList,
      { name: "Mustafa Mokrani" },
      { name: "Houssem Jelitti" }
    ]}
  />
);

export const NoTags = () => (
  <IssueCard title="new task" assignedTo={fakeMembersList} />
);

export const NotAssigned = () => <IssueCard title="new task" />;

export const WithTagsButNotAssigned = () => (
  <IssueCard title="new task" tags={["webApp", "Api", "DB"]} />
);
export default {
  title: "IssueCard",
  decorators: [Host]
};
