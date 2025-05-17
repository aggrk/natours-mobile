import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useForm, Controller } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import axios from "axios";

const IMG = "https://natours-api-chd9.onrender.com/img/users";
const URL = "https://natours-api-chd9.onrender.com/api/v1";

const EditProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { currentUser, changeUser } = useCurrentUser();
  const name = currentUser?.data?.data?.name || "Guest";
  const email = currentUser?.data?.data?.email || "No email provided";
  const photo = currentUser?.data?.data?.photo || "default.jpg";

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);

    if (profileImage) {
      const localUri = profileImage;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      formData.append("photo", {
        uri: localUri,
        name: filename,
        type,
      });
    }

    try {
      setLoading(true);
      await axios.patch(`${URL}/users/updateMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      changeUser();
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <StatusBar style="dark" backgroundColor="#D8F3DC" />
        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: profileImage || `${IMG}/${photo}` }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editPhotoButton} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#1B4332" />
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Personal Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color="#40916C" />
                <Controller
                  control={control}
                  name="name"
                  defaultValue={name}
                  rules={{ required: "Name is required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your full name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#40916C" />
                <Controller
                  control={control}
                  name="email"
                  defaultValue={email}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit(handleSave)}
            >
              <Text style={styles.saveButtonText}>
                {loading ? (
                  <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                  "Save Changes"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F3DC",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#FFD166",
  },
  editPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#FFD166",
    borderRadius: 20,
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#1B4332",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#1B4332",
    paddingVertical: 0,
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 13,
    marginTop: 6,
    marginLeft: 8,
    fontFamily: "Inter-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#40916C",
    borderRadius: 12,
    paddingVertical: 16,
    flex: 1,
    marginRight: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#40916C",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#2D6A4F",
    borderRadius: 12,
    paddingVertical: 16,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
});

export default EditProfileScreen;
