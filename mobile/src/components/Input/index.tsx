import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
} from "./styles";

interface Props extends TextInputProps {
  value?: string;
  iconName: React.ComponentProps<typeof Feather>["name"];
  secureTextEntry?: boolean;
}

const Input = ({ value, iconName, secureTextEntry, ...rest }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const theme = useTheme();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled
              ? theme.colors.main
              : theme.colors.text_details
          }
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      {secureTextEntry && (
        <ChangePasswordVisibilityButton
          isFocused={isFocused}
          onPress={handlePasswordVisibilityChange}
        >
          <Feather
            name={!isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={theme.colors.text_details}
          />
        </ChangePasswordVisibilityButton>
      )}
    </Container>
  );
};

export default Input;
