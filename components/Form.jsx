import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Form({ children, title, description }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="dark" backgroundColor="#D8F3DC" />
        <View style={styles.form}>
          {title && <Text style={styles.formTitle}>{title}</Text>}
          {description && (
            <Text style={styles.formDescription}>{description}</Text>
          )}
          <View style={styles.fieldsContainer}>{children}</View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F3DC", // Lighter, more modern background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 24,
  },
  form: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    maxWidth: 450, // Better for tablets
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 16, // More rounded corners
    alignSelf: "center",
    elevation: 8, // More pronounced shadow on Android
    shadowColor: "#1B4332", // Green tinted shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  formTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    color: "#1B4332",
    textAlign: "center",
    marginBottom: 8,
  },
  formDescription: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#5E5E5E",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  fieldsContainer: {
    width: "100%",
    gap: 16, // Consistent spacing between form fields
  },
});
