import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";

import CarSvg from "../assets/car.svg";
import HomeSvg from "../assets/home.svg";
import PeopleSvg from "../assets/people.svg";
import Home from "../screens/Home";
import MyCars from "../screens/MyCars";
import Profile from "../screens/Profile";
import AppStackRoutes from "./app.stack.routes";

const { Navigator, Screen } = createBottomTabNavigator();

const AppTabRoute = () => {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_details,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} color={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export default AppTabRoute;
