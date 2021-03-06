import React, { useEffect, useRef, useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import { StyleSheet, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { MoviePreviewCard } from "../components/MoviePreviewCard";
import { Title } from "../components/Title";
import { useAppSelector } from "../data";
import {
  searchMoviesAsyncAction,
  selectFilteredMoviesIds,
} from "../data/slices/filteredMoviesSlice";

const messages = defineMessages({
  title: {
    id: "SearchScreen.title",
    defaultMessage: "Search",
  },
  searchPlaceholder: {
    id: "SearchScreen.searchPlaceholder",
    defaultMessage: "Movie name",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  autocomplete: {
    position: "relative",
    width: "100%",
    marginTop: 16,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 12,
  },
  searchInput: {
    paddingVertical: 12,
    paddingLeft: 40,
    backgroundColor: "#f4f4f4",
    borderRadius: 6,
  },
  autocompleteList: {
    marginTop: 16,
  },
  autocompleteListContainer: {
    flex: 1,
    alignItems: "center",
  },
  movieCard: {
    marginBottom: 16,
    width: 200,
    height: 300,
  },
});

const keyExtractor = (id: string) => id;

const renderMovieItem = ({ item: id }: { item: string }) => (
  <View style={styles.movieCard}>
    <MoviePreviewCard id={id} />
  </View>
);

export const SearchScreen = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput & { focus: () => void }>(null);
  const filteredMoviesIds = useAppSelector(selectFilteredMoviesIds);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputRef.current?.focus();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    dispatch(searchMoviesAsyncAction(search));
  }, [dispatch, search]);

  return (
    <View style={styles.container}>
      <Title>{intl.formatMessage(messages.title)}</Title>
      <View style={styles.autocomplete}>
        <FontAwesome name="search" size={20} style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          placeholder={intl.formatMessage(messages.searchPlaceholder)}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        style={styles.autocompleteList}
        contentContainerStyle={styles.autocompleteListContainer}
        data={filteredMoviesIds}
        keyExtractor={keyExtractor}
        renderItem={renderMovieItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
