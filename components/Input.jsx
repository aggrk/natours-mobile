import { StyleSheet, TextInput, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const Input = ({ style, fieldName, control, errors, ...props }) => {
  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={[
              styles.input,
              errors[fieldName] && styles.inputError,
              style,
            ]}
            {...props}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor="#A0A0A0"
          />
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
  input: {
    width: "100%",
    height: 52,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 6,
    borderRadius: 10,
    fontFamily: "Inter-Regular",
    color: "#2D2D2D",
    letterSpacing: 0.2,
  },
  inputError: {
    borderColor: "#FF4D4D",
    backgroundColor: "#FFF5F5",
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
});
