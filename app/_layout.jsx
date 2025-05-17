import { useEffect } from "react";
import { Stack } from "expo-router";
import UserProvider from "../contexts/userContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Inter-Regular": require("../assets/fonts/InterRegular.ttf"),
    "Inter-Bold": require("../assets/fonts/InterBold.ttf"),
    "Inter-Medium": require("../assets/fonts/InterMedium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <UserProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
