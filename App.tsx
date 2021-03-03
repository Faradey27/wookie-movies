import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { useCachedResources } from "./src/hooks/useCachedResources";
import { AppNavigator } from "./src/navigation";

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar />
    </SafeAreaProvider>
  );
};

export default App;
