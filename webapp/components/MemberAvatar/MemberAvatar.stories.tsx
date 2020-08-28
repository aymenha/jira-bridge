import React from "react";
import { host } from "storybook-host";
import MemberAvatar from "./MemberAvatar";

const Host = host({
  align: "center middle",
  background: true,
  backdrop: true
});

export const Default = () => (
  <MemberAvatar
    name="Hamdi Gatri"
    picture="https://scontent.ftun9-1.fna.fbcdn.net/v/t1.0-9/12009805_1145661418868233_7763260555478118487_n.jpg?_nc_cat=106&_nc_sid=174925&_nc_ohc=s9_o8hnM084AX-WKqmq&_nc_ht=scontent.ftun9-1.fna&oh=85a5b1788b87c37d739d8050a2a1c8cd&oe=5F6C9858"
  />
);

export const Large = () => (
  <MemberAvatar
    name="Hamdi Gatri"
    picture="https://scontent.ftun9-1.fna.fbcdn.net/v/t1.0-9/12009805_1145661418868233_7763260555478118487_n.jpg?_nc_cat=106&_nc_sid=174925&_nc_ohc=s9_o8hnM084AX-WKqmq&_nc_ht=scontent.ftun9-1.fna&oh=85a5b1788b87c37d739d8050a2a1c8cd&oe=5F6C9858"
    size="large"
  />
);

export default {
  title: "MemberAvatar",
  decorators: [Host]
};
