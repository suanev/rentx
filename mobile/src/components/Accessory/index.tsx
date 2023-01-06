import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

import { Container, Name } from "./styles";

interface Props {
  name: string;
  icon: React.FC<SvgProps>;
}

const Accessory = ({ name, icon: Icon }: Props) => {
  const theme = useTheme();
  return (
    <Container>
      <Icon width={32} height={32} fill={theme.colors.header} />
      <Name>{name}</Name>
    </Container>
  );
};

export default Accessory;
