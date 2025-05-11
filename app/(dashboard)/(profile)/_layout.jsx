import React from "react";
import { Stack } from "expo-router";
import CurrentUserProvider from "../../../contexts/currentUserContext";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Edit Profile",
          headerShown: true,
          headerStyle: { backgroundColor: "#D8F3DC" },
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 24,
            color: "#1B4332",
          },
          headerTintColor: "#1B4332",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
          headerStyle: { backgroundColor: "#D8F3DC" },
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 24,
            color: "#1B4332",
          },
          headerTintColor: "#1B4332",
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          title: "Change Password",
          headerShown: true,
          headerStyle: { backgroundColor: "#D8F3DC" },
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 24,
            color: "#1B4332",
          },
          headerTintColor: "#1B4332",
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
