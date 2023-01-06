import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

interface ImageIndexProps {
  active?: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: 132px;

  align-items: center;
  justify-content: center;
`;

export const CarImage = styled(FastImage)`
  width: 280px;
  height: 132px;
`;
