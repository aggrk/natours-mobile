import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { StatusBar } from "expo-status-bar";

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const password = watch("password");

  const handleSave = (data) => {
    console.log("Password change data:", data);
    Alert.alert("Success!", "Your password has been updated securely.", [
      { text: "OK" },
    ]);
  };

  // Password strength indicators
  const passwordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#D8F3DC" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* Current Password */}
          <View style={styles.inputGroup}>
            <View
              style={[
                styles.inputContainer,
                errors.passwordCurrent && styles.inputError,
              ]}
            >
              <MaterialIcons
                name="lock"
                size={20}
                color={errors.passwordCurrent ? "#E74C3C" : "#40916C"}
                style={styles.icon}
              />
              <Controller
                control={control}
                name="passwordCurrent"
                rules={{ required: "Current password is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Current Password"
                    placeholderTextColor="#95a5a6"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            {errors.passwordCurrent && (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={16} color="#E74C3C" />
                <Text style={styles.errorText}>
                  {errors.passwordCurrent.message}
                </Text>
              </View>
            )}
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <View
              style={[
                styles.inputContainer,
                errors.password && styles.inputError,
              ]}
            >
              <MaterialIcons
                name="lock-outline"
                size={20}
                color={errors.password ? "#E74C3C" : "#40916C"}
                style={styles.icon}
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "New password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor="#95a5a6"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                  />
                )}
              />
            </View>

            {/* Password Strength Meter */}
            {password && (
              <View style={styles.strengthMeter}>
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.strengthBar,
                      {
                        backgroundColor:
                          i <= passwordStrength()
                            ? ["#ff3e36", "#ff8c42", "#f9c74f", "#90be6d"][
                                passwordStrength() - 1
                              ]
                            : "#ecf0f1",
                      },
                    ]}
                  />
                ))}
              </View>
            )}

            {errors.password && (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={16} color="#E74C3C" />
                <Text style={styles.errorText}>{errors.password.message}</Text>
              </View>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <View
              style={[
                styles.inputContainer,
                errors.passwordConfirm && styles.inputError,
              ]}
            >
              <MaterialIcons
                name="lock-reset"
                size={20}
                color={errors.passwordConfirm ? "#E74C3C" : "#40916C"}
                style={styles.icon}
              />
              <Controller
                control={control}
                name="passwordConfirm"
                rules={{
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    placeholderTextColor="#95a5a6"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            {errors.passwordConfirm && (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={16} color="#E74C3C" />
                <Text style={styles.errorText}>
                  {errors.passwordConfirm.message}
                </Text>
              </View>
            )}
          </View>

          {/* Password Requirements */}
          <View style={styles.requirementsBox}>
            <Text style={styles.requirementsTitle}>Password Requirements</Text>

            <View style={styles.requirementItem}>
              <MaterialIcons
                name={
                  password?.length >= 8
                    ? "check-circle"
                    : "radio-button-unchecked"
                }
                size={18}
                color={password?.length >= 8 ? "#2D6A4F" : "#bdc3c7"}
              />
              <Text style={styles.requirementText}>Minimum 8 characters</Text>
            </View>

            <View style={styles.requirementItem}>
              <MaterialIcons
                name={
                  /[A-Z]/.test(password)
                    ? "check-circle"
                    : "radio-button-unchecked"
                }
                size={18}
                color={/[A-Z]/.test(password) ? "#2D6A4F" : "#bdc3c7"}
              />
              <Text style={styles.requirementText}>
                At least one uppercase letter
              </Text>
            </View>

            <View style={styles.requirementItem}>
              <MaterialIcons
                name={
                  /[0-9]/.test(password)
                    ? "check-circle"
                    : "radio-button-unchecked"
                }
                size={18}
                color={/[0-9]/.test(password) ? "#2D6A4F" : "#bdc3c7"}
              />
              <Text style={styles.requirementText}>At least one number</Text>
            </View>
          </View>

          {/* Buttons Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => Alert.alert("Cancelled", "Changes were not saved")}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
              onPress={handleSubmit(handleSave)}
              disabled={!isValid}
            >
              <Text style={styles.saveButtonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F3DC",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  inputError: {
    borderColor: "#E74C3C",
    backgroundColor: "#fef2f2",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1B4332",
    paddingVertical: 0,
    fontFamily: "Inter-Regular",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 13,
    marginLeft: 6,
    fontFamily: "Inter-Regular",
  },
  strengthMeter: {
    flexDirection: "row",
    height: 4,
    backgroundColor: "#ecf0f1",
    borderRadius: 2,
    marginTop: 10,
    overflow: "hidden",
  },
  strengthBar: {
    flex: 1,
    height: "100%",
    borderRadius: 2,
    marginRight: 2,
  },
  requirementsBox: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginBottom: 10,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  requirementText: {
    color: "#555",
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#40916C",
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#40916C",
    fontFamily: "Inter-Bold",
  },
  saveButton: {
    backgroundColor: "#2D6A4F",
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "white",
    fontFamily: "Inter-Bold",
  },
});
