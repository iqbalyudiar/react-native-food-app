import React from "react";
import { render } from "@testing-library/react-native";
import Example from "~/screens/Example";

it("renders correctly", () => {
  const tree = render(<Example />).toJSON();
  expect(tree).toMatchSnapshot();
});
