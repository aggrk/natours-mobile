import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useUser from "../../../hooks/useUser";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const IMG = "https://natours-api-chd9.onrender.com/img/users";

const SettingsScreen = () => {
  // Toggle states
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  const { currentUser } = useCurrentUser();
  const { logout } = useUser();
  const router = useRouter();

  const name = currentUser?.data?.data?.name || "Guest";
  const email = currentUser?.data?.data?.email || "No email provided";
  const photo = currentUser?.data?.data?.photo || "default.jpg";

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#D8F3DC" />

      {/* User Profile Card */}
      <TouchableOpacity
        style={styles.profileCard}
        onPress={() => router.replace("/(profile)")}
      >
        <Image source={{ uri: `${IMG}/${photo}` }} style={styles.avatar} />
        <View style={styles.profileText}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#40916C" />
      </TouchableOpacity>

      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <Link href="/editProfile" asChild>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <MaterialIcons name="edit" size={20} color="#FFD166" />
            </View>
            <Text style={styles.settingText}>Edit Profile</Text>
            <Feather name="chevron-right" size={18} color="#40916C" />
          </TouchableOpacity>
        </Link>

        <Link href="/changePassword" asChild>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <MaterialIcons name="lock" size={20} color="#FFD166" />
            </View>
            <Text style={styles.settingText}>Change Password</Text>
            <Feather name="chevron-right" size={18} color="#40916C" />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.settingItem} onPress={logout}>
          <View style={styles.settingIcon}>
            <MaterialCommunityIcons name="logout" size={20} color="#FFD166" />
          </View>
          <Text style={[styles.settingText, { color: "#E74C3C" }]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="moon" size={20} color="#FFD166" />
          </View>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#D8F3DC", true: "#2D6A4F" }}
            thumbColor={darkMode ? "#FFD166" : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="notifications" size={20} color="#FFD166" />
          </View>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#D8F3DC", true: "#2D6A4F" }}
            thumbColor={notifications ? "#FFD166" : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <FontAwesome name="map-marker" size={20} color="#FFD166" />
          </View>
          <Text style={styles.settingText}>Location Access</Text>
          <Switch
            value={locationAccess}
            onValueChange={setLocationAccess}
            trackColor={{ false: "#D8F3DC", true: "#2D6A4F" }}
            thumbColor={locationAccess ? "#FFD166" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="help-circle" size={20} color="#FFD166" />
          </View>
          <Text style={styles.settingText}>Help Center</Text>
          <Feather name="chevron-right" size={18} color="#40916C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <MaterialIcons name="contact-support" size={20} color="#FFD166" />
          </View>
          <Text style={styles.settingText}>Contact Us</Text>
          <Feather name="chevron-right" size={18} color="#40916C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <MaterialIcons name="info" size={20} color="#FFD166" />
          </View>
          <Text style={styles.settingText}>About Natours</Text>
          <Feather name="chevron-right" size={18} color="#40916C" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F3DC",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,

    padding: 16,
    marginBottom: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFD166",
  },
  profileText: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#40916C",
    marginTop: 4,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(45, 106, 79, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#1B4332",
  },
});

export default SettingsScreen;
