import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";

import { selectMovieById, useAppSelector } from "../data";
import { Title } from "./Title";

type MovieDetailsHeaderProps = {
  id: string;
  previous?: boolean;
};

const PREVIEW_IMAGE_WIDTH = 100;
const PREVIEW_IMAGE_HEIGHT = 150;
const BACKDROP_IMAGE_HEIGHT = 180;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: BACKDROP_IMAGE_HEIGHT + PREVIEW_IMAGE_HEIGHT * 0.5,
  },
  posterContainer: {
    top:
      BACKDROP_IMAGE_HEIGHT * 0.5 +
      (BACKDROP_IMAGE_HEIGHT - PREVIEW_IMAGE_HEIGHT) * 0.5,
    left: 24,
    position: "absolute",
  },
  titleContainer: {
    position: "absolute",
    zIndex: 1,
    left: PREVIEW_IMAGE_WIDTH + 32,
    bottom: PREVIEW_IMAGE_HEIGHT * 0.5 + 8,
  },
  rating: {
    position: "absolute",
    zIndex: 1,
    left: PREVIEW_IMAGE_WIDTH + 32,
    bottom: 0,
    flex: 1,
    flexDirection: "row",
  },
  backdropImage: {
    flex: 1,
    maxHeight: BACKDROP_IMAGE_HEIGHT,
  },
  posterImage: {
    width: PREVIEW_IMAGE_WIDTH,
    height: PREVIEW_IMAGE_HEIGHT,
  },
  backButton: {
    position: "absolute",
    top: 8,
    zIndex: 1,
  },
});

const generateRatingStars = (rating?: number) => {
  const stars: ("star" | "star-o" | "star-half-empty")[] = [
    "star-o",
    "star-o",
    "star-o",
    "star-o",
    "star-o",
  ];
  const normalizedRating = rating ? rating / 2 : 0;

  for (let i = 0; i < Math.floor(normalizedRating); i++) {
    stars[i] = "star";
  }

  if (normalizedRating - Math.floor(normalizedRating) > 0) {
    stars[Math.floor(normalizedRating)] = "star-half-empty";
  }

  return stars;
};

export const MovieDetailsHeader = ({
  id,
  previous,
}: MovieDetailsHeaderProps) => {
  const navigation = useNavigation();
  const movieData = useAppSelector((state) => selectMovieById(state, id));

  if (!movieData) {
    return null;
  }

  const titleLabel = `${movieData.title} (${movieData.classification})`;

  return (
    <View style={styles.container}>
      {previous && (
        <View style={styles.backButton}>
          <HeaderBackButton tintColor="white" onPress={navigation.goBack} />
        </View>
      )}
      <View style={styles.titleContainer}>
        <Title size="small" color="white">
          {titleLabel}
        </Title>
      </View>
      <View style={styles.rating}>
        {generateRatingStars(movieData.imdb_rating).map((name) => (
          <FontAwesome name={name} size={20} color="orange" />
        ))}
      </View>
      <Image
        source={{ uri: movieData?.backdrop }}
        style={styles.backdropImage}
      />
      <View style={styles.posterContainer}>
        <Image source={{ uri: movieData?.poster }} style={styles.posterImage} />
      </View>
    </View>
  );
};