import React from "react";
import { View } from "react-native";

import { Container } from "./styles";

interface Props {
  key?: string;
  active?: boolean;
}

const Bullet = ({ key, active = false }: Props) => {
  return <Container key={String(key)} active={active} />;
};

export default Bullet;
