import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  useFonts,
} from "@expo-google-fonts/archivo";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import React from "react";
import { LogBox } from "react-native";
import { ThemeProvider } from "styled-components";

import AppProvider from "./src/hooks";
import Routes from "./src/navigation";
import theme from "./src/styles/theme";

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  LogBox.ignoreLogs([
    "Native splash screen is already hidden. Call this method before rendering any view.",
  ]);

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
