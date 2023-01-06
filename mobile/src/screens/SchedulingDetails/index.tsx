import { Feather } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

import Accessory from "../../components/Accessory";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import ImageSlider from "../../components/ImageSlider";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import getAccessoryIcon from "../../utils/getAccessoryIcon";
import getPlatformDate from "../../utils/getPlatformDate";
import {
  Accessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

interface RentalPeriodProps {
  start: string;
  end: string;
}

interface Params {
  car: CarDTO;
  dates: Array<string>;
}

const SchedulingDetails = () => {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );
  const [carUpdated, setCardUpdated] = useState<CarDTO>({} as CarDTO);

  const route = useRoute();
  const navigation = useNavigation();
  const { isConnected } = useNetInfo();

  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  const theme = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchCarUpdated = async () => {
      const { data } = await api.get(`/cars/${car.id}`);

      setCardUpdated(data);
    };
    if (isConnected === true) {
      fetchCarUpdated();
    }
  }, [isConnected]);

  const handleConfirm = async () => {
    setLoading(true);

    await api
      .post("rentals", {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() =>
        navigation.navigate("Confirmation", {
          title: "Carro alugado!",
          message:
            "Agora você só precisa ir\n até a concessionária da RENTX\n pegar o seu automóvel.",
        })
      )
      .catch(() => {
        Alert.alert("Não foi possivel confirmar o agendamento.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {carUpdated && carUpdated.accessories && (
          <Accessories>
            {car.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                icon={getAccessoryIcon(accessory.type)}
                name={accessory.name}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.price} x${dates.length} ${
                dates.length - 1 > 1 ? "diárias" : "diária"
              }`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirm}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};

export default SchedulingDetails;
