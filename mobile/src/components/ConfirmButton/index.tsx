import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title?: string;
  onPress: () => void;
}

const ConfirmButton = ({ title = "OK", onPress, ...rest }: Props) => {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default ConfirmButton;
