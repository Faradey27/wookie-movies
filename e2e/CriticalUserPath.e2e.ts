import "./types";
import { by, element, expect } from "detox";
import { reloadApp } from "detox-expo-helpers";

describe("Critical user path", () => {
  it("should see movies", async () => {
    await reloadApp();
    await expect(element(by.text("Tab One"))).toBeVisible();
  });
});
