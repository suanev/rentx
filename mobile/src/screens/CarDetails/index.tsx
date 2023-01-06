import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";

import Accessory from "../../components/Accessory";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import ImageSlider from "../../components/ImageSlider";
import { Car as ModelCar } from "../../database/model/Car";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import getAccessoryIcon from "../../utils/getAccessoryIcon";
import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Description,
  Details,
  Footer,
  Header,
  Name,
  OfflineInfo,
  Period,
  Price,
  Rent,
} from "./styles";

interface Params {
  car: ModelCar;
}

const CarDetails = () => {
  const [carUpdated, setCardUpdated] = useState<CarDTO>({} as CarDTO);

  const theme = useTheme();
  const route = useRoute();
  const { isConnected } = useNetInfo();
  const navigation = useNavigation();

  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    (event) => (scrollY.value = event.contentOffset.y)
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    navigation.navigate("Scheduling", { car });
  };

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  useEffect(() => {
    const fetchCarUpdated = async () => {
      const { data } = await api.get(`/cars/${car.id}`);

      setCardUpdated(data);
    };
    if (isConnected === true) {
      fetchCarUpdated();
    }
  }, [isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyle,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>

        <Animated.View style={[sliderCarStyle]}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: "center",
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {isConnected === true ? car.price : "..."}</Price>
          </Rent>
        </Details>

        {carUpdated && carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                icon={getAccessoryIcon(accessory.type)}
                name={accessory.name}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher periodo do aluguel"
          enabled={isConnected! || true}
          onPress={handleConfirm}
        />

        {isConnected === false ? (
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        ) : (
          <React.Fragment />
        )}
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});

export default CarDetails;
