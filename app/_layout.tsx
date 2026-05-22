import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Italic": require("../assets/fonts/Nunito-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
