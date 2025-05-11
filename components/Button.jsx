import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export default function Button({
  buttonName,
  onPress,
  style,
  loading = false,
  disabled = false,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
        (loading || disabled) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#1B4332" />
      ) : (
        <Text style={styles.buttonText}>{buttonName}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFD166",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 10, // Increased for modern look
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12, // More balanced spacing
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Slightly more visible
    shadowRadius: 4,
    minHeight: 56, // Better touch target
    flexDirection: "row",
    gap: 8,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }], // Subtle press effect
  },
  disabled: {
    backgroundColor: "#E5E5E5",
  },
  buttonText: {
    fontFamily: "Inter-SemiBold", // More prominent
    fontSize: 18, // Slightly smaller
    color: "#1B4332",
    letterSpacing: 0.5, // Better readability
    includeFontPadding: false, // Better vertical alignment
  },
});
