import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";

import { AppNavigator } from "../navigation";

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

it(`renders correctly`, async () => {
  const { findByText } = render(<AppNavigator />);
  const title = await findByText("Home");

  expect(title).toBeTruthy();
});
