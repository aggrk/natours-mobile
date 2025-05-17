import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const bookings = [
  {
    id: "1",
    tour: {
      name: "The Forest Hiker",
      imageCover: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      duration: 5,
      startLocation: "Banff National Park, Canada",
    },
    date: "2023-06-15",
    price: 497,
    status: "confirmed",
    participants: 2,
  },
  {
    id: "2",
    tour: {
      name: "The Sea Explorer",
      imageCover:
        "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6",
      duration: 7,
      startLocation: "Honolulu, Hawaii",
    },
    date: "2023-07-22",
    price: 899,
    status: "pending",
    participants: 4,
  },
  {
    id: "3",
    tour: {
      name: "The Snow Adventurer",
      imageCover:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5",
      duration: 4,
      startLocation: "Zermatt, Switzerland",
    },
    date: "2023-12-10",
    price: 750,
    status: "confirmed",
    participants: 1,
  },
];

const BookingsScreen = () => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const router = useRouter();

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => router.push(`/bookings/${item.id}`)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.tour.imageCover }} style={styles.tourImage} />
      <View style={styles.imageOverlay} />

      <View style={styles.bookingInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.tourName}>{item.tour.name}</Text>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.tour.duration} days</Text>
          </View>
        </View>

        <View style={styles.bookingMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar" size={16} color="#FFF" />
            <Text style={styles.metaText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.metaItem}>
            <FontAwesome name="map-marker" size={16} color="#FFF" />
            <Text style={styles.metaText}>{item.tour.startLocation}</Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <View
            style={[
              styles.statusBadge,
              item.status === "confirmed"
                ? styles.confirmedBadge
                : styles.pendingBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              ${item.price * item.participants}
            </Text>
            <Text style={styles.participantsText}>
              {item.participants}{" "}
              {item.participants === 1 ? "person" : "people"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#F8F9FA" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#1B4332" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="calendar" size={48} color="#2D6A4F" />
          </View>
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptySubtext}>Start your adventure today</Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate("Tours")}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>Explore Tours</Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.listHeader}>Upcoming Trips</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  listHeader: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginVertical: 16,
    marginLeft: 4,
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tourImage: {
    width: "100%",
    height: 180,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bookingInfo: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tourName: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#FFF",
    flex: 1,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  durationBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  durationText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
  },
  bookingMeta: {
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFF",
    marginLeft: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  confirmedBadge: {
    backgroundColor: "rgba(64, 145, 108, 0.2)",
    borderColor: "rgba(64, 145, 108, 0.5)",
  },
  pendingBadge: {
    backgroundColor: "rgba(255, 209, 102, 0.2)",
    borderColor: "rgba(255, 209, 102, 0.5)",
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  participantsText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "rgba(255,255,255,0.8)",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    backgroundColor: "rgba(45, 106, 79, 0.1)",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#1B4332",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#95a5a6",
    marginBottom: 24,
    textAlign: "center",
  },
  exploreButton: {
    backgroundColor: "#2D6A4F",
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#2D6A4F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  exploreButtonText: {
    color: "white",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
});

export default BookingsScreen;
