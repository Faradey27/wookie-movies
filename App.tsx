import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";

import { createStore } from "./src/data";
import { useCachedResources } from "./src/hooks/useCachedResources";
import { AppNavigator } from "./src/navigation";

// TODO consider of moving store creation inside react lifecycle (under useEffect or ref)
const store = createStore();

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
