import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import {
  fetchMoviesAsyncAction,
  selectMoviesIdsByGenre,
  useAppSelector,
} from "../data";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const moviesIdsByGenres = useAppSelector(selectMoviesIdsByGenre);

  useEffect(() => {
    dispatch(fetchMoviesAsyncAction());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {moviesIdsByGenres.map(({ name, ids }) => (
        <span key={name}>
          {name}
          {ids.map((id) => (
            <span key={id}>{id}</span>
          ))}
        </span>
      ))}
    </View>
  );
};
