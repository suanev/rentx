import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import BrandSVG from "../../assets/brand.svg";
import LogoSVG from "../../assets/logo.svg";

import { Container } from "./styles";

const Splash = () => {
  const navigation = useNavigation();

  const splashAnimation = useSharedValue(0);

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
  }, []);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        { translateX: interpolate(splashAnimation.value, [0, 50], [0, -50]) },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        { translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0]) },
      ],
    };
  });

  const startApp = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSVG width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSVG width={180} height={20} />
      </Animated.View>
    </Container>
  );
};

export default Splash;
