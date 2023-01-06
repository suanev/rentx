import { Ionicons } from "@expo/vector-icons";
import { synchronize } from "@nozbe/watermelondb/sync";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { BackHandler, StatusBar } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

import Logo from "../../assets/logo.svg";
import Car from "../../components/Car";
import LoadAnimation from "../../components/LoadAnimation";
import { database } from "../../database";
import { Car as ModelCar } from "../../database/model/Car";
import api from "../../services/api";
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars,
} from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(MyCarsButton);

const Home = () => {
  const [cars, setCars] = useState<Array<ModelCar>>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any) {
      positionX.value = event.translationX + context.positionX;
      positionY.value = event.translationY + context.positionY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const theme = useTheme();
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();
        console.log(cars);
        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
          .catch();
        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("users/sync/", user).catch();
      },
    });
  };

  const handleCarDetails = (car: ModelCar) => {
    navigation.navigate("CarDetails", {
      car,
    });
  };

  const handleOpenMyCars = () => {
    navigation.navigate("MyCars");
  };

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={myCarsButtonStyle}>
          <ButtonAnimated onPress={handleOpenMyCars}>
            <Ionicons
              name="car-sport"
              size={32}
              color={theme.colors.background_secondary}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

export default Home;
