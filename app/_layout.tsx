import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    nunito: require("../assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "nunito-semibold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "nunito-light": require("../assets/fonts/Nunito-Light.ttf"),
    "nunito-extrabold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
    "nunito-medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "nunito-italic": require("../assets/fonts/Nunito-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
