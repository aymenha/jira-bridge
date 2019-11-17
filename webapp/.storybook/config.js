import { configure, addParameters } from "@storybook/react";

// automatically import all files ending in *.stories.js
const req = require.context("../components", true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  backgrounds: [{ name: "default", value: "#f3f5f7", default: true }]
});

configure(loadStories, module);
