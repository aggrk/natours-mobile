import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Link style={styles.link} href="/login">
        Login Page
      </Link>
      <Link style={styles.link} href="/register">
        Register Page
      </Link>
      <Link style={styles.link} href="/(profile)">
        Profile
      </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
  link: {
    fontSize: 16,
    color: "#1B4332",
    textDecorationLine: "underline",
    fontFamily: "Inter-Regular",
    padding: 10,
  },
});
