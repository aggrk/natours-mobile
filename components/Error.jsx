import { StyleSheet, Text, View } from "react-native";

export default function Error({ message }) {
  return (
    <View style={styles.error}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: "#ffbaba",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: "#ff0000",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
});
