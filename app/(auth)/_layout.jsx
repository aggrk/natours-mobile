import { Stack } from "expo-router";
import React from "react";
import GuestOnly from "../../components/AuthUI/GuestOnly";

const RootLayout = () => {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }} />
    </GuestOnly>
  );
};

export default RootLayout;
