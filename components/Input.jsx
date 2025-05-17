import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

const iconComponents = {
  email: { component: MaterialIcons, name: "email" },
  user: { component: FontAwesome, name: "user" },
  lock: { component: Feather, name: "lock" },
  phone: { component: Feather, name: "phone" },
  // Add more icons as needed
};

const Input = ({
  style,
  fieldName,
  control,
  errors,
  icon,
  secureTextEntry = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const IconComponent = icon ? iconComponents[icon].component : null;
  const iconName = icon ? iconComponents[icon].name : null;

  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { value, onChange, onBlur } }) => (
          <View
            style={[
              styles.inputContainer,
              errors[fieldName] && styles.inputErrorContainer,
            ]}
          >
            {icon && (
              <IconComponent
                name={iconName}
                size={20}
                color={errors[fieldName] ? "#FF4D4D" : "#A0A0A0"}
                style={styles.icon}
              />
            )}

            <TextInput
              style={[
                styles.input,
                icon && styles.inputWithIcon,
                errors[fieldName] && styles.inputError,
                style,
              ]}
              {...props}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="#A0A0A0"
              secureTextEntry={secureTextEntry && !showPassword}
            />

            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#A0A0A0"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {errors[fieldName] && (
        <Text style={styles.errorText}>{errors[fieldName].message}</Text>
      )}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 52,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
    marginBottom: 6,
    borderRadius: 10,
  },
  inputErrorContainer: {
    borderColor: "#FF4D4D",
    backgroundColor: "#FFF5F5",
  },
  icon: {
    marginLeft: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: "#2D2D2D",
    letterSpacing: 0.2,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  inputError: {
    color: "#FF4D4D",
  },
  errorText: {
    color: "#FF4D4D",
    alignSelf: "flex-start",
    fontSize: 13,
    marginTop: -2,
    marginBottom: 10,
    marginLeft: 6,
    fontFamily: "Inter-Medium",
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
});
