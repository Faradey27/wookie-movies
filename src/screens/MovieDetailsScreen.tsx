import React, { useMemo } from "react";
import { defineMessage, FormattedMessage } from "react-intl";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useCollapsibleHeader } from "react-navigation-collapsible";
import { useRoute } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";

import { MovieDetailsHeader } from "../components/MovieDetailsHeader";
import { selectMovieById, useAppSelector } from "../data";
import { MovieDetailsRouteProp } from "../navigation/routes";

const messages = defineMessage({
  movieInfo: {
    id: "MoviewDetailsScreen.movieInfo",
    defaultMessage: "{year} | {duration} | {director}",
  },
  cast: {
    id: "MoviewDetailsScreen.cast",
    defaultMessage: "Cast: {value}",
  },
  moviewDescription: {
    id: "MoviewDetailsScreen.moviewDescription",
    defaultMessage: "Movie description: {value}",
  },
});

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

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={contentContainerStyle}
        scrollIndicatorInsets={scrollIndicatorInsets}
        onScroll={onScroll}
      >
        <Text>
          <FormattedMessage
            {...messages.movieInfo}
            values={{
              year,
              duration: movieData?.length,
              director: movieData?.director,
            }}
          />
        </Text>
        <Text style={styles.item}>
          <FormattedMessage
            {...messages.cast}
            values={{ value: movieData?.cast?.join(", ") }}
          />
        </Text>
        <Text style={styles.item}>
          <FormattedMessage
            {...messages.moviewDescription}
            values={{ value: movieData?.overview }}
          />
        </Text>
      </Animated.ScrollView>
    </View>
  );
};
