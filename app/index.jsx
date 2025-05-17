import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import axios from "axios";
import useUser from "../hooks/useUser";

const { width } = Dimensions.get("window");

const URL = "https://natours-api-chd9.onrender.com/api/v1";
const IMG = "https://natours-api-chd9.onrender.com/img/tours";

const categories = ["All", "Easy", "Medium", "Difficult"];

const NatoursToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({}); // Initialize as empty object

  const { user } = useUser();

  const router = useRouter();

  // Update favorites when tours are fetched
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL}/tours`, {
          withCredentials: true,
        });
        const tourData = res.data.data.data;
        setTours(tourData);
        // Initialize favorites based on fetched tours
        setFavorites(
          tourData.reduce(
            (acc, tour) => ({ ...acc, [tour.id]: tour.isFavorite || false }),
            {}
          )
        );
      } catch (err) {
        const errMessage = err?.response?.data?.message;
        console.log(errMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredTours = tours.filter((tour) => {
    const matchesCategory =
      selectedCategory === "All" ||
      tour.difficulty?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      tour.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.startLocation?.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2e8b57" />
        <Text
          style={{
            marginTop: 10,
            color: "#2e8b57",
            fontFamily: "Inter-Medium",
          }}
        >
          Loading tours
        </Text>
      </View>
    );
  }

  const renderTourCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(`/(tours)/tour/${item.id}`)}
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: `${IMG}/${item.imageCover}` }} // Use imageCover from API
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={favorites[item.id] ? "heart" : "heart-outline"}
            size={20}
            color={favorites[item.id] ? "#ff4757" : "#fff"}
          />
        </TouchableOpacity>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>
            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
          </Text>
        </View>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.tourTitle}>{item.name}</Text>
        <Text style={styles.tourLocation}>
          <Ionicons name="location-outline" size={14} color="#666" />{" "}
          {item.startLocation?.description || "Unknown"}
        </Text>
        <View style={styles.tourMeta}>
          <Text style={styles.tourDuration}>
            <Feather name="clock" size={14} color="#666" /> {item.duration} days
          </Text>
          <Text style={styles.tourRating}>
            <FontAwesome name="star" size={14} color="#FFD700" />{" "}
            {item.ratingsAverage || "N/A"} ({item.ratingsQuantity || 0})
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={() => router.push(`/booking/${item.id}`)}
        >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2e8b57" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Natours</Text>
        <View style={styles.headerIcons}>
          {user ? (
            <TouchableOpacity onPress={() => router.push("/(profile)")}>
              <Ionicons
                name="person-outline"
                size={24}
                color="#fff"
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Ionicons
                  name="log-in-outline"
                  size={24}
                  color="#fff"
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Ionicons
                  name="person-add-outline"
                  size={24}
                  color="#fff"
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tours or locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tours List */}
      <FlatList
        data={filteredTours}
        renderItem={renderTourCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2e8b57"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="earth-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No tours found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    backgroundColor: "#2e8b57",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logo: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    color: "#fff",
    letterSpacing: 1.2,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#333",
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#e8ecef",
  },
  categoryButtonActive: {
    backgroundColor: "#2e8b57",
  },
  categoryText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Inter-Medium",
  },
  categoryTextActive: {
    color: "#fff", // Ensure high contrast
    fontFamily: "Inter-Bold",
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardImageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 16,
    padding: 6,
  },
  difficultyBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(46, 139, 87, 0.9)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  priceTag: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  priceText: {
    color: "#2e8b57",
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
  cardContent: {
    padding: 16,
  },
  tourTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#333",
    marginBottom: 6,
  },
  tourLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Inter-Medium",
  },
  tourMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tourDuration: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  tourRating: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    fontFamily: "Inter-Medium",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  // Add to StyleSheet
  bookNowButton: {
    backgroundColor: "#2e8b57",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
    marginTop: 8,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
});

export default NatoursToursPage;
