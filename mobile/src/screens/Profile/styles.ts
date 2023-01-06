import { Pressable, TouchableOpacity } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;

  padding: 0 24px;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View`
  width: 100%;

  margin-top: ${getStatusBarHeight() + 32}px;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;

  border-radius: 90px;
  margin-top: 48px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;

  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;

  border-radius: 20px;

  align-items: center;
  justify-content: center;

  right: 10px;
  bottom: 10px;
  position: absolute;

  background-color: ${({ theme }) => theme.colors.main};
`;

export const Content = styled(TouchableOpacity)`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Option = styled(TouchableOpacity)<OptionProps>`
  ${({ active }) =>
    active &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({ theme }) => theme.colors.main};
    `}

  padding-bottom: 14px;
`;

export const OptionTitle = styled.Text<OptionProps>`
  text-align: center;
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};

  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_details};
`;

export const Section = styled.View``;
