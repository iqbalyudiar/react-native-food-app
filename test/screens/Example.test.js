import React from "react";
import renderer from "react-test-renderer";
import Example from "~/screens/Example";

it("renders correctly", () => {
  const tree = renderer.create(<Example />).toJSON();
  expect(tree).toMatchSnapshot();
});
