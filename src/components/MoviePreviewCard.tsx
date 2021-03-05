import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { selectMovieById, useAppSelector } from "../data";
import { Routes } from "../navigation/routes";

type MoviePreviewCardProps = {
  id: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 120,
    height: 180,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
});

export const MoviePreviewCard = ({ id }: MoviePreviewCardProps) => {
  const navigation = useNavigation();
  const movieData = useAppSelector((state) => selectMovieById(state, id));

  const handlePress = useCallback(() => {
    navigation.navigate(Routes.MovieDetails, { id });
  }, [navigation, id]);

  const source = useMemo(
    () => ({
      uri: movieData?.poster,
    }),
    [movieData?.poster]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image style={styles.poster} source={source} />
    </TouchableOpacity>
  );
};
