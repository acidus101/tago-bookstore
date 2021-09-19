import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./navigation";
import { Provider } from 'react-redux';
import store from "./Redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigation/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;