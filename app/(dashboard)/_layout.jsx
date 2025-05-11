import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import UserOnly from "../../components/AuthUI/UserOnly";
import CurrentUserProvider from "../../contexts/currentUserContext";

const DashboardLayout = () => {
  return (
    <CurrentUserProvider>
      <UserOnly>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#1B4332",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "white",
              paddingBottom: 10,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "Inter-Regular",
            },
          }}
        >
          <Tabs.Screen
            name="(profile)"
            options={{
              title: "Profile",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color="#1B4332"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="bookings"
            options={{
              title: "Bookings",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={24}
                  color="#1B4332"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: "Favorites",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "heart" : "heart-outline"}
                  size={24}
                  color="#1B4332"
                />
              ),
            }}
          />
        </Tabs>
      </UserOnly>
    </CurrentUserProvider>
  );
};

export default DashboardLayout;
