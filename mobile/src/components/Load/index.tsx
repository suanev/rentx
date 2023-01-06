import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

const Load = () => {
  const theme = useTheme();
  return (
    <ActivityIndicator
      style={{ flex: 1 }}
      size="large"
      color={theme.colors.main}
    />
  );
};

export default Load;
