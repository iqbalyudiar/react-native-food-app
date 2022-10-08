import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import HomeScreen from "~/screens/HomeScreen";
import { Provider as RestaurantProvider } from "~/context/RestaurantContext";

import { NavigationContext } from "@react-navigation/native";

afterAll(() => {
  jest.restoreAllMocks();
});

it("render default", async () => {
  const navContextValue = {
    isFocused: () => true,
    addListener: jest.fn(() => jest.fn()),
  };
  const navigation = {
    navigate: jest.fn(),
  };

  const mockData = {
    id: 1,
    name: "KFC",
  };
  const wrapper = render(
    <NavigationContext.Provider value={navContextValue}>
      <RestaurantProvider>
        <HomeScreen navigation={navigation} />
      </RestaurantProvider>
    </NavigationContext.Provider>
  );

  await waitFor(() => {
    expect(wrapper.getByTestId("home-screen-navigate-1")).toBeTruthy();
  });
  fireEvent.press(wrapper.getByTestId("home-screen-navigate-1"), mockData);

  expect(wrapper).toMatchSnapshot();
});
