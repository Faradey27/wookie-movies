import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { Routes } from "./routes";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => (
  <BottomTab.Navigator initialRouteName={Routes.Home}>
    <BottomTab.Screen
      name={Routes.Home}
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons
            size={30}
            style={{ marginBottom: -3 }}
            name="ios-code"
            color={color}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name={Routes.Search}
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons
            size={30}
            style={{ marginBottom: -3 }}
            name="ios-code"
            color={color}
          />
        ),
      }}
    />
  </BottomTab.Navigator>
);
