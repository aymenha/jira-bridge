import React from "react";
import { host } from "storybook-host";
import IssueCardsColumn from "./IssueCardsColumn";

const Host = host({
  align: "center middle",
  backdrop: true,
  width: 400
});

const fakeCardsList = [
  {
    title: "task 1",
    tags: ["FrontEnd", "BackEnd"],
    assignedTo: [
      {
        name: "Mohamed Aymmen Hammemi",
        picture:
          "https://ca.slack-edge.com/T1EHPUWM8-UCWDN1KHA-2b0596fbe248-512"
      }
    ]
  },
  {
    title: "task 2",
    tags: ["API", "DB"],
    assignedTo: [
      {
        name: "Fakher Gh",
        picture:
          "https://ca.slack-edge.com/T1EHPUWM8-UFWL9UUF3-5cbfb7d112af-512"
      }
    ]
  },
  {
    title: "task 3",
    tags: ["API", "DB"],
    assignedTo: [
      {
        name: "Hamdi Gatri",
        picture:
          "https://ca.slack-edge.com/T1EHPUWM8-U7TMLMR8B-8a8f4e4791a7-512"
      }
    ]
  }
];

export const Default = () => (
  <IssueCardsColumn
    title="backlog"
    list={fakeCardsList}
    onCreate={() => console.log("** test **")}
    onMove={() => console.log("## test ##")}
  />
);
export const Empty = () => (
  <IssueCardsColumn
    title="in progress"
    onCreate={() => console.log("create new card clicked")}
    onMove={() => console.log("card moved")}
  />
);
export default {
  title: "IssueCardsColumn",
  decorators: [Host]
};
