import React, { useEffect } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { MoviePreviewCard } from "../components/MoviePreviewCard";
import { Title } from "../components/Title";
import {
  fetchMoviesAsyncAction,
  selectMoviesIdsByGenre,
  useAppSelector,
} from "../data";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionList: {
    paddingLeft: 24,
    paddingRight: 16,
    marginTop: 12,
  },
  sectionTitle: {
    marginTop: 24,
    marginLeft: 24,
  },
  movieCard: {
    marginRight: 8,
  },
});

type Section = {
  title: string;
  data: string[];
};

const keyExtractor = (id: string) => id;

const renderSectionItem = () => null;

const renderGenreItem = ({ item: id }: { item: string }) => (
  <View style={styles.movieCard}>
    <MoviePreviewCard id={id} />
  </View>
);

const renderSectionHeader = ({ section }: { section: Section }) => (
  <>
    <View style={styles.sectionTitle}>
      <Title>{section.title}</Title>
    </View>
    <FlatList
      contentContainerStyle={styles.sectionList}
      horizontal
      data={section.data}
      keyExtractor={keyExtractor}
      renderItem={renderGenreItem}
      showsHorizontalScrollIndicator={false}
    />
  </>
);

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const moviesIdsByGenres = useAppSelector(selectMoviesIdsByGenre);

  useEffect(() => {
    dispatch(fetchMoviesAsyncAction());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <SectionList
        keyExtractor={keyExtractor}
        sections={moviesIdsByGenres}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderSectionItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
