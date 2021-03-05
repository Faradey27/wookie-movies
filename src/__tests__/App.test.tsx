import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";

import { createStore } from "../data";
import { AppNavigator } from "../navigation";

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

it(`renders correctly`, async () => {
  const { findByText } = render(
    <Provider store={createStore()}>
      <AppNavigator />
    </Provider>
  );
  const title = await findByText("Home");

  expect(title).toBeTruthy();
});
