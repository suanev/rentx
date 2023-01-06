import FastImage from "react-native-fast-image";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;
  height: 126px;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  padding: 24px;
  margin-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Details = styled.View``;

export const Brand = styled.Text`
  text-transform: uppercase;
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.text_details};
`;

export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.title};
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  text-transform: uppercase;
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.text_details};
`;

export const Price = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.main};
`;

export const Type = styled.View`
  color: ${({ theme }) => theme.colors.text_details};
`;

export const CardImage = styled(FastImage)`
  width: 167px;
  height: 85px;
`;
