import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Animated,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Mock data - replace with your actual favorites data
const mockFavorites = [
  {
    id: "1",
    name: "Forest Hiking Adventure",
    location: "Blue Mountains, Australia",
    duration: 3,
    difficulty: "medium",
    ratingsAverage: 4.8,
    ratingsQuantity: 124,
    price: 299,
    imageCover: "https://images.unsplash.com/photo-1511497584788-876760111969",
    startDate: "2023-07-15",
  },
  {
    id: "2",
    name: "Coastal Cliff Walk",
    location: "Dover, UK",
    duration: 1,
    difficulty: "easy",
    ratingsAverage: 4.5,
    ratingsQuantity: 89,
    price: 129,
    imageCover: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6",
    startDate: "2023-08-22",
  },
];

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [refreshing, setRefreshing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation();

  useEffect(() => {
    setIsEmpty(favorites.length === 0);
  }, [favorites]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((tour) => tour.id !== id));
  };

  const renderTourCard = ({ item, index }) => {
    const inputRange = [
      -1,
      0,
      height * 0.15 * index, // Smoother animation spacing
      height * 0.15 * (index + 2),
    ];

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.3],
    });

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.95],
    });

    return (
      <Animated.View
        style={[styles.cardContainer, { opacity, transform: [{ scale }] }]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("TourDetails", { tourId: item.id })
          }
        >
          <View style={styles.card}>
            <Image
              source={{ uri: item.imageCover }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />

            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.tourTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFavorite(item.id)}
                >
                  <Ionicons name="trash-outline" size={22} color="#ff4757" />
                </TouchableOpacity>
              </View>

              <Text style={styles.tourLocation}>
                <Ionicons name="location-outline" size={16} color="#666" />{" "}
                {item.location}
              </Text>

              <View style={styles.tourMeta}>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={16}
                    color="#2e8b57"
                  />
                  <Text style={styles.metaText}>
                    Starts {new Date(item.startDate).toLocaleDateString()}
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <Feather name="clock" size={16} color="#2e8b57" />
                  <Text style={styles.metaText}>
                    {item.duration} day{item.duration > 1 ? "s" : ""}
                  </Text>
                </View>
              </View>

              <View style={styles.tourFooter}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {item.ratingsAverage} ({item.ratingsQuantity})
                  </Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>${item.price}</Text>
                  <Text style={styles.perPerson}>per person</Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor:
                    item.difficulty === "easy"
                      ? "#4CAF50"
                      : item.difficulty === "medium"
                      ? "#FFC107"
                      : "#F44336",
                },
              ]}
            >
              <Text style={styles.difficultyText}>
                {item.difficulty.charAt(0).toUpperCase() +
                  item.difficulty.slice(1)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Favorites</Text>
      </View>

      {/* Content */}
      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Save your favorite tours to see them here
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate("Tours")}
          >
            <Text style={styles.exploreButtonText}>Explore Tours</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Animated.FlatList
          data={favorites}
          renderItem={renderTourCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#2e8b57"]}
              tintColor="#2e8b57"
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    backgroundColor: "#2e8b57",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: 26,
    fontFamily: "Inter-Bold", // Assuming Inter font is loaded
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginRight: 40, // Offset for back button
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 48,
  },
  cardContainer: {
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  card: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 220, // Taller for visual impact
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tourTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: "#333",
    flex: 1,
    marginRight: 12,
  },
  removeButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
  },
  tourLocation: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#666",
    marginBottom: 16,
  },
  tourMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  metaText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#666",
    marginLeft: 6,
  },
  tourFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
    color: "#666",
    marginLeft: 6,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: "#2e8b57",
  },
  perPerson: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#999",
  },
  difficultyBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  difficultyText: {
    fontSize: 13,
    fontFamily: "Inter-Bold",
    fontWeight: "600",
    color: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: "#444",
    marginTop: 24,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#777",
    marginTop: 12,
    textAlign: "center",
    lineHeight: 24,
  },
  exploreButton: {
    marginTop: 32,
    backgroundColor: "#2e8b57",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  exploreButtonText: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontWeight: "600",
    fontSize: 17,
  },
});

export default FavoritesScreen;
