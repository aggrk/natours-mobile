import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useUser from "../../../hooks/useUser";
import { StatusBar } from "expo-status-bar";

const IMG = "https://natours-api-chd9.onrender.com/img/users";

const UserProfileScreen = () => {
  const { loading, currentUser } = useCurrentUser();
  const { logout } = useUser();

  const name = currentUser?.data?.data?.name || "Guest";
  const email = currentUser?.data?.data?.email || "No email provided";
  const photo = currentUser?.data?.data?.photo || "default.jpg";

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1B4332" />
        <Text
          style={{
            marginTop: 10,
            color: "#1B4332",
            fontFamily: "Inter-Medium",
          }}
        >
          Loading your profile...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#2D6A4F" />
      {/* Header with user info */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: `${IMG}/${photo}` }} style={styles.avatar} />
          <TouchableOpacity style={styles.editPhotoButton}>
            <Ionicons name="camera" size={20} color="#1B4332" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>

        <TouchableOpacity style={styles.editProfileButton}>
          <Link href="/editProfile" style={styles.editProfileButtonText}>
            Edit Profile
          </Link>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#D8F3DC" />
          </TouchableOpacity> */}
      </View>

      {/* Main content */}
      <ScrollView style={styles.content}>
        {/* Account Info Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="account-circle" size={24} color="#1B4332" />
            <Text style={styles.sectionTitle}>Account Information</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Member since</Text>
            <Text style={styles.infoValue}>January 2022</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Account status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Premium Member</Text>
            </View>
          </View>
        </View>

        {/* Travel Stats Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="passport" size={24} color="#1B4332" />
            <Text style={styles.sectionTitle}>My Travel Stats</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3.2k</Text>
              <Text style={styles.statLabel}>Miles</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={24} color="#1B4332" />
            <Text style={styles.sectionTitle}>Upcoming Trips</Text>
          </View>

          <View style={styles.tripCard}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e",
              }}
              style={styles.tripImage}
            />
            <View style={styles.tripDetails}>
              <Text style={styles.tripTitle}>Norwegian Fjords Expedition</Text>
              <Text style={styles.tripDate}>June 10-17, 2023</Text>
              <View style={styles.tripStatus}>
                <View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: "#2D6A4F" },
                  ]}
                />
                <Text style={styles.tripStatusText}>Confirmed</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All Bookings</Text>
            <MaterialIcons name="chevron-right" size={20} color="#40916C" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={24}
              color="#1B4332"
            />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <FontAwesome name="heart" size={18} color="#D8F3DC" />
              </View>
              <Text style={styles.actionText}>Wishlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <MaterialCommunityIcons
                  name="wallet-travel"
                  size={18}
                  color="#D8F3DC"
                />
              </View>
              <Text style={styles.actionText}>My Bookings</Text>
            </TouchableOpacity>

            <Link href="/settings" asChild>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <MaterialIcons name="settings" size={18} color="#D8F3DC" />
                </View>
                <Text style={styles.actionText}>Settings</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <MaterialCommunityIcons
                  name="help-circle"
                  size={18}
                  color="#D8F3DC"
                />
              </View>
              <Text style={styles.actionText}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F3DC",
  },
  header: {
    backgroundColor: "#2D6A4F",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 10,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFD166",
  },
  editPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFD166",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: "white",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#D8F3DC",
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: "rgba(255, 209, 102, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD166",
  },
  editProfileButtonText: {
    color: "#FFD166",
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },

  // logoutButton: {
  //   backgroundColor: "rgba(216, 243, 220, 0.2)",
  //   padding: 8,
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   borderColor: "#D8F3DC",
  // },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginLeft: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#40916C",
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1B4332",
  },
  statusBadge: {
    backgroundColor: "rgba(45, 106, 79, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    color: "#2D6A4F",
    fontSize: 12,
    fontFamily: "Inter-Medium",
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#F8FAF9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#40916C",
  },
  tripCard: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  tripImage: {
    width: "100%",
    height: 120,
  },
  tripDetails: {
    padding: 15,
    backgroundColor: "#F8FAF9",
  },
  tripTitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginBottom: 5,
  },
  tripDate: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#40916C",
    marginBottom: 10,
  },
  tripStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  tripStatusText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#1B4332",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  viewAllButtonText: {
    color: "#40916C",
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    width: "48%",
    alignItems: "center",
    marginBottom: 15,
  },
  actionIcon: {
    backgroundColor: "#2D6A4F",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#1B4332",
    textAlign: "center",
  },
});

export default UserProfileScreen;
