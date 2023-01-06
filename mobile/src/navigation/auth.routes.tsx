import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Confirmation from "../screens/Confirmation";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUpFirstStep from "../screens/SignUp/SignUpFirstStep";
import SignUpSecondStep from "../screens/SignUp/SignUpSecondStep";
import Splash from "../screens/Splash";

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Screen name="Splash" component={Splash} />
      <Screen
        name="SignIn"
        component={SignIn}
        options={{ gestureEnabled: false }}
      />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
};

export default AuthRoutes;
