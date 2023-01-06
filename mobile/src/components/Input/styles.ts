import { TextInput, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const IconContainer = styled.View<Props>`
  width: 56px;
  height: 56px;

  align-items: center;
  justify-content: center;

  border-right-width: 2px;
  border-right-color: ${({ theme }) => theme.colors.background_primary};

  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.main : theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;

  padding: 0 23px;

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(16)}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.main : theme.colors.background_secondary};
`;

export const ChangePasswordVisibilityButton = styled.Pressable<Props>`
  width: 56px;
  height: 56px;

  align-items: center;
  justify-content: center;

  /* padding-right: 16px; */

  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.main : theme.colors.background_secondary};
`;
