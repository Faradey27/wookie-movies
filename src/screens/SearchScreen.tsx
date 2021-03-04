import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../data";
import {
  searchMoviesAsyncAction,
  selectFilteredMoviesIds,
} from "../data/slices/filteredMoviesSlice";

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

export const SearchScreen = () => {
  const dispatch = useDispatch();
  const filteredMoviesIds = useAppSelector(selectFilteredMoviesIds);

  useEffect(() => {
    dispatch(searchMoviesAsyncAction("Dark"));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      {filteredMoviesIds.map((id) => (
        <span key={id}>{id}</span>
      ))}
    </View>
  );
};
