import React from "react";
import { host } from "storybook-host";
import Task from "./Task";

const Host = host({
  align: "center middle",
  background: true,
  backdrop: true,
});

export const Default = () => <Task />;

export default {
  title: "Tasks",
  decorators: [Host],
};
