import React from "react";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CardImage,
} from "./styles";

import { RectButtonProps } from "react-native-gesture-handler";
import getAccessoryIcon from "../../utils/getAccessoryIcon";
import { Car as ModelCar } from "../../database/model/Car";
import { useNetInfo } from "@react-native-community/netinfo";

interface Props extends RectButtonProps {
  data: ModelCar;
}

const Car = ({ data, ...rest }: Props) => {
  const { isConnected } = useNetInfo();

  const MotorIcon = getAccessoryIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>R$ {isConnected === true ? data.price : "..."}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CardImage
        resizeMode="contain"
        source={{
          uri: data.thumbnail,
        }}
      />
    </Container>
  );
};

export default Car;
