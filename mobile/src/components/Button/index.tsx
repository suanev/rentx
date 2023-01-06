import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  light?: boolean;
  loading?: boolean;
}

const Button = ({
  title,
  color,
  light = false,
  enabled = true,
  loading = false,
  onPress,
  ...rest
}: Props) => {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      onPress={onPress}
      color={color ? color : theme.colors.main}
      enabled={enabled}
      style={{ opacity: !enabled || loading ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};

export default Button;
