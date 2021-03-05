import React, { ReactNode } from "react";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens/HomeScreen";
import { MovieDetailsScreen } from "../screens/MovieDetailsScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { HomeStackParamList, Routes } from "./routes";

const BottomTab = createBottomTabNavigator();

const HomeStack = createStackNavigator<HomeStackParamList>();

const noHeader = { headerShown: false };

const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name={Routes.Home}
      component={HomeScreen}
      options={noHeader}
    />
    <HomeStack.Screen
      name={Routes.MovieDetails}
      component={MovieDetailsScreen}
    />
  </HomeStack.Navigator>
);

const TabBarLabel = ({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) => <Text style={{ color, fontSize: 12, marginBottom: 6 }}>{children}</Text>;

export const BottomTabNavigator = () => (
  <BottomTab.Navigator initialRouteName={Routes.Home}>
    <BottomTab.Screen
      name={Routes.Home}
      component={HomeNavigator}
      options={{
        tabBarLabel: ({ color }) => (
          <TabBarLabel color={color}>Home</TabBarLabel>
        ),
        tabBarIcon: ({ color }) => (
          <FontAwesome
            size={20}
            style={{ marginBottom: -3 }}
            name="home"
            color={color}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name={Routes.Search}
      component={SearchScreen}
      options={{
        tabBarLabel: ({ color }) => (
          <TabBarLabel color={color}>Search</TabBarLabel>
        ),
        tabBarIcon: ({ color }) => (
          <FontAwesome
            size={20}
            style={{ marginBottom: -3 }}
            name="search"
            color={color}
          />
        ),
      }}
    />
  </BottomTab.Navigator>
);
