import React from "react";
import LottieView from "lottie-react-native";

import loadingCar from "../../assets/load_animated.json";

import { Container } from "./styles";

const LoadAnimation = () => {
  return (
    <Container>
      <LottieView
        style={{ flex: 1, height: 200 }}
        loop={true}
        resizeMode="contain"
        autoPlay={true}
        source={loadingCar}
      />
    </Container>
  );
};

export default LoadAnimation;
