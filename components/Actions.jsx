import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Actions = ({ message, children, dest, variant = "default" }) => {
  return (
    <View style={styles.container}>
      {children && <View style={styles.childrenContainer}>{children}</View>}

      <Link href={dest} asChild>
        <Pressable
          style={({ pressed }) => [
            styles.linkButton,
            styles[variant],
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.linkText, styles[`${variant}Text`]]}>
            {message}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Actions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // marginTop: ,
    gap: 16,
    alignItems: "center",
  },
  childrenContainer: {
    width: "100%",
    gap: 12,
  },
  linkButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
  // Variant styles
  default: {
    backgroundColor: "transparent",
  },
  defaultText: {
    color: "#1B4332",
    textDecorationLine: "underline",
  },
  contained: {
    backgroundColor: "#1B4332",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  containedText: {
    color: "#FFFFFF",
    textDecorationLine: "none",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1B4332",
  },
  outlinedText: {
    color: "#1B4332",
    textDecorationLine: "none",
  },
  pressed: {
    opacity: 0.8,
  },
});
