import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import DoneSVG from "../../assets/done.svg";
import LogoSVG from "../../assets/logo_background_gray.svg";
import ConfirmButton from "../../components/ConfirmButton";
import { Container, Content, Footer, Message, Title } from "./styles";

interface Params {
  title: string;
  message?: string;
  buttonText?: string;
  goToScreen?: string;
}

const Confirmation = () => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation();

  const {
    title,
    message,
    buttonText,
    goToScreen = "Home",
  } = route.params as Params;

  const handleGoHome = () => {
    navigation.navigate(goToScreen);
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSVG width={width} />

      <Content>
        <DoneSVG width={80} height={80} />
        <Title>{title}</Title>

        {message && <Message> {message}</Message>}
      </Content>
      <Footer>
        <ConfirmButton title={buttonText} onPress={handleGoHome} />
      </Footer>
    </Container>
  );
};

export default Confirmation;
