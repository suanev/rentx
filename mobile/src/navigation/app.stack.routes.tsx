import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import CarDetails from "../screens/CarDetails";
import Confirmation from "../screens/Confirmation";
import Home from "../screens/Home";
import MyCars from "../screens/MyCars";
import Scheduling from "../screens/Scheduling";
import SchedulingDetails from "../screens/SchedulingDetails";

const { Navigator, Screen } = createStackNavigator();

const AppStackRoutes = () => {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};

export default AppStackRoutes;
