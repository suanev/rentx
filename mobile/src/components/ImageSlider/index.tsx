import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import Bullet from "../Bullet";

import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: Array<{
    id: string;
    photo: string;
  }>;
}

interface ChangedImageProps {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}

const ImageSlider = ({ imagesUrl }: Props) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangedImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <Bullet key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
};

export default ImageSlider;
