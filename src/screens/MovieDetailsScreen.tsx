import React, { useMemo } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useCollapsibleHeader } from "react-navigation-collapsible";
import { useRoute } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";

import { MovieDetailsHeader } from "../components/MovieDetailsHeader";
import { selectMovieById, useAppSelector } from "../data";
import { MovieDetailsRouteProp } from "../navigation/routes";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  content: {
    height: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 24,
    marginBottom: 64,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    marginTop: 16,
  },
});

const getHeaderConfig = (id: string) => ({
  navigationOptions: {
    header: ({ previous }: StackHeaderProps) => (
      <MovieDetailsHeader id={id} previous={Boolean(previous)} />
    ),
  },
  config: { useNativeDriver: true },
});

export const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsRouteProp>();
  const { id } = route.params;
  const movieData = useAppSelector((state) => selectMovieById(state, id));
  const headerConfig = useMemo(() => getHeaderConfig(id), [id]);

  const {
    containerPaddingTop,
    scrollIndicatorInsetTop,
    onScroll,
  } = useCollapsibleHeader(headerConfig);

  const contentContainerStyle = useMemo(
    () => [styles.content, { paddingTop: containerPaddingTop }],
    [containerPaddingTop]
  );

  const scrollIndicatorInsets = useMemo(
    () => ({ top: scrollIndicatorInsetTop }),
    [scrollIndicatorInsetTop]
  );

  const year = movieData?.released_on
    ? new Date(movieData.released_on).getFullYear()
    : "???";

  const castStr = `Cast: ${movieData?.cast?.join(",")}`;
  const description = `Movie description: ${movieData?.overview}`;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={contentContainerStyle}
        scrollIndicatorInsets={scrollIndicatorInsets}
        onScroll={onScroll}
      >
        <Text>{`${year} | ${movieData?.length} | ${movieData?.director}`}</Text>
        <Text style={styles.item}>{castStr}</Text>
        <Text style={styles.item}>{description}</Text>
      </Animated.ScrollView>
    </View>
  );
};
