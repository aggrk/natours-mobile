// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import useCurrentUser from "../../../hooks/useCurrentUser";
// import axios from "axios";
// import { useRouter } from "expo-router";

// const URL = "https://natours-api-chd9.onrender.com/api/v1";
// const IMG = "https://natours-api-chd9.onrender.com/img/tours";

// const ToursScreen = () => {
//   const { currentUser } = useCurrentUser();
//   const [tours, setTours] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("all");

//   const router = useRouter();

//   // Simulate API fetch
//   const fetchTours = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${URL}/tours`, {
//         withCredentials: true,
//       });
//       const tourData = res.data.data.data;
//       setTours(tourData);
//     } catch (err) {
//       const errMessage = err?.response?.data?.message;
//       console.log(errMessage);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchTours();
//   }, []);

//   const handleRefresh = () => {
//     fetchTours();
//   };

//   const filterTours = (difficulty) => {
//     setActiveFilter(difficulty);
//     if (difficulty === "all") {
//       setTours(tours);
//     } else {
//       setTours(tours.filter((tour) => tour.difficulty === difficulty));
//     }
//   };

//   const renderTourItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.tourCard}
//       onPress={() => router.push(`/tour/${item._id}`)}
//     >
//       <Image
//         source={{ uri: `${IMG}/${item.imageCover}` }}
//         style={styles.tourImage}
//       />
//       <LinearGradient
//         colors={["transparent", "rgba(0,0,0,0.7)"]}
//         style={styles.imageOverlay}
//       />

//       <View style={styles.tourInfo}>
//         <Text style={styles.tourName}>{item.name}</Text>

//         <View style={styles.tourMeta}>
//           <View style={styles.metaItem}>
//             <Ionicons name="location" size={14} color="#FFD166" />
//             <Text style={styles.metaText}>
//               {item.startLocation.description}
//             </Text>
//           </View>
//           <View style={styles.metaItem}>
//             <FontAwesome name="calendar" size={14} color="#FFD166" />
//             <Text style={styles.metaText}>{item.duration} days</Text>
//           </View>
//         </View>

//         <View style={styles.tourFooter}>
//           <View style={styles.ratingContainer}>
//             <Ionicons name="star" size={14} color="#FFD166" />
//             <Text style={styles.ratingText}>
//               {item.ratingsAverage} ({item.ratingsQuantity})
//             </Text>
//           </View>

//           <View style={styles.priceContainer}>
//             <Text style={styles.priceText}>${item.price}</Text>
//             <Text style={styles.perPersonText}>per person</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2D6A4F" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <LinearGradient
//         colors={["#2D6A4F", "#40916C"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}
//       >
//         <Text style={styles.headerTitle}>Available Tours</Text>
//         <View style={styles.userBadge}>
//           <Ionicons name="person" size={18} color="#D8F3DC" />
//           <Text style={styles.userText}>
//             {currentUser?.data?.data?.name || "Guest"}
//           </Text>
//         </View>
//       </LinearGradient>

//       {/* Filter Bar */}
//       <View style={styles.filterContainer}>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             activeFilter === "all" && styles.activeFilter,
//           ]}
//           onPress={() => filterTours("all")}
//         >
//           <Text style={styles.filterText}>All Tours</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             activeFilter === "easy" && styles.activeFilter,
//           ]}
//           onPress={() => filterTours("easy")}
//         >
//           <Text style={styles.filterText}>Easy</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             activeFilter === "medium" && styles.activeFilter,
//           ]}
//           onPress={() => filterTours("medium")}
//         >
//           <Text style={styles.filterText}>Medium</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             activeFilter === "difficult" && styles.activeFilter,
//           ]}
//           onPress={() => filterTours("difficult")}
//         >
//           <Text style={styles.filterText}>Difficult</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Tours List */}
//       <FlatList
//         data={tours}
//         renderItem={renderTourItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             colors={["#2D6A4F"]}
//             tintColor="#2D6A4F"
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <MaterialIcons name="travel-explore" size={48} color="#D8F3DC" />
//             <Text style={styles.emptyText}>No tours found</Text>
//             <Text style={styles.emptySubtext}>
//               Try adjusting your filters or check back later
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//   },
//   header: {
//     padding: 20,
//     paddingTop: 50,
//     paddingBottom: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     shadowColor: "#1B4332",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontFamily: "Inter-Bold",
//     color: "white",
//   },
//   userBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   userText: {
//     fontFamily: "Inter-Medium",
//     fontSize: 14,
//     color: "white",
//     marginLeft: 6,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#D8F3DC",
//   },
//   filterButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#D8F3DC",
//     marginRight: 10,
//   },
//   activeFilter: {
//     backgroundColor: "#2D6A4F",
//     borderColor: "#2D6A4F",
//   },
//   filterText: {
//     fontFamily: "Inter-Medium",
//     fontSize: 14,
//     color: "#1B4332",
//   },
//   activeFilterText: {
//     color: "white",
//   },
//   listContent: {
//     padding: 15,
//     paddingBottom: 30,
//   },
//   tourCard: {
//     height: 220,
//     borderRadius: 16,
//     overflow: "hidden",
//     marginBottom: 20,
//     shadowColor: "#1B4332",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   tourImage: {
//     width: "100%",
//     height: "100%",
//   },
//   imageOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     top: "50%",
//   },
//   tourInfo: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 16,
//   },
//   tourName: {
//     fontSize: 20,
//     fontFamily: "Inter-Bold",
//     color: "white",
//     marginBottom: 8,
//   },
//   tourMeta: {
//     flexDirection: "row",
//     marginBottom: 12,
//   },
//   metaItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 16,
//   },
//   metaText: {
//     fontFamily: "Inter-Regular",
//     fontSize: 13,
//     color: "white",
//     marginLeft: 6,
//   },
//   tourFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ratingText: {
//     fontFamily: "Inter-Medium",
//     fontSize: 14,
//     color: "white",
//     marginLeft: 5,
//   },
//   priceContainer: {
//     alignItems: "flex-end",
//   },
//   priceText: {
//     fontFamily: "Inter-Bold",
//     fontSize: 18,
//     color: "white",
//   },
//   perPersonText: {
//     fontFamily: "Inter-Regular",
//     fontSize: 12,
//     color: "rgba(255,255,255,0.8)",
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 40,
//   },
//   emptyText: {
//     fontFamily: "Inter-Medium",
//     fontSize: 18,
//     color: "#95a5a6",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptySubtext: {
//     fontFamily: "Inter-Regular",
//     fontSize: 14,
//     color: "#95a5a6",
//     textAlign: "center",
//   },
// });

// export default ToursScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useCurrentUser from "../../../hooks/useCurrentUser";
import axios from "axios";
import { useRouter } from "expo-router";

const URL = "https://natours-api-chd9.onrender.com/api/v1";
const IMG = "https://natours-api-chd9.onrender.com/img/tours";

const ToursScreen = () => {
  const { currentUser } = useCurrentUser();
  const [tours, setTours] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const router = useRouter();

  // Fetch tours and user's favorites
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch tours
      const toursRes = await axios.get(`${URL}/tours`, {
        withCredentials: true,
      });
      const tourData = toursRes.data.data.data;
      setTours(tourData);

      // Fetch favorites if user is logged in
      if (currentUser?.data?.data?._id) {
        const favRes = await axios.get(`${URL}/users/favorites`, {
          withCredentials: true,
        });
        setFavorites(favRes.data.data.favorites || []);
      }
    } catch (err) {
      const errMessage = err?.response?.data?.message;
      console.log(errMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleRefresh = () => {
    fetchData();
  };

  const filterTours = (difficulty) => {
    setActiveFilter(difficulty);
    if (difficulty === "all") {
      fetchData(); // Reset to all tours
    } else {
      setTours(tours.filter((tour) => tour.difficulty === difficulty));
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (tourId) => {
    if (!currentUser?.data?.data?._id) {
      Alert.alert("Login Required", "Please login to save favorites");
      return;
    }

    try {
      const isFavorite = favorites.includes(tourId);

      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`${URL}/users/favorites/${tourId}`, {
          withCredentials: true,
        });
        setFavorites(favorites.filter((id) => id !== tourId));
      } else {
        // Add to favorites
        await axios.post(
          `${URL}/users/favorites/${tourId}`,
          {},
          {
            withCredentials: true,
          }
        );
        setFavorites([...favorites, tourId]);
      }
    } catch (err) {
      console.log("Error updating favorites:", err.response?.data?.message);
      Alert.alert("Error", "Could not update favorites");
    }
  };

  const renderTourItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tourCard}
      onPress={() => router.push(`/tour/${item._id}`)}
    >
      <Image
        source={{ uri: `${IMG}/${item.imageCover}` }}
        style={styles.tourImage}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.imageOverlay}
      />

      {/* Favorite Button */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={(e) => {
          e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
          toggleFavorite(item._id);
        }}
      >
        <Ionicons
          name={favorites.includes(item._id) ? "heart" : "heart-outline"}
          size={24}
          color={favorites.includes(item._id) ? "#FF6B6B" : "white"}
        />
      </TouchableOpacity>

      <View style={styles.tourInfo}>
        <Text style={styles.tourName}>{item.name}</Text>

        <View style={styles.tourMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={14} color="#FFD166" />
            <Text style={styles.metaText}>
              {item.startLocation.description}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <FontAwesome name="calendar" size={14} color="#FFD166" />
            <Text style={styles.metaText}>{item.duration} days</Text>
          </View>
        </View>

        <View style={styles.tourFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD166" />
            <Text style={styles.ratingText}>
              {item.ratingsAverage} ({item.ratingsQuantity})
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${item.price}</Text>
            <Text style={styles.perPersonText}>per person</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D6A4F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#2D6A4F", "#40916C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Available Tours</Text>
        <View style={styles.userBadge}>
          <Ionicons name="person" size={18} color="#D8F3DC" />
          <Text style={styles.userText}>
            {currentUser?.data?.data?.name || "Guest"}
          </Text>
        </View>
      </LinearGradient>

      {/* Filter Bar */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === "all" && styles.activeFilter,
          ]}
          onPress={() => filterTours("all")}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === "all" && styles.activeFilterText,
            ]}
          >
            All Tours
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === "easy" && styles.activeFilter,
          ]}
          onPress={() => filterTours("easy")}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === "easy" && styles.activeFilterText,
            ]}
          >
            Easy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === "medium" && styles.activeFilter,
          ]}
          onPress={() => filterTours("medium")}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === "medium" && styles.activeFilterText,
            ]}
          >
            Medium
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === "difficult" && styles.activeFilter,
          ]}
          onPress={() => filterTours("difficult")}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === "difficult" && styles.activeFilterText,
            ]}
          >
            Difficult
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tours List */}
      <FlatList
        data={tours}
        renderItem={renderTourItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#2D6A4F"]}
            tintColor="#2D6A4F"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="travel-explore" size={48} color="#D8F3DC" />
            <Text style={styles.emptyText}>No tours found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your filters or check back later
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
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "white",
  },
  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  userText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "white",
    marginLeft: 6,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8F3DC",
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "#2D6A4F",
    borderColor: "#2D6A4F",
  },
  filterText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#1B4332",
  },
  activeFilterText: {
    color: "white",
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  tourCard: {
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tourImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: "50%",
  },
  tourInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  tourName: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "white",
    marginBottom: 8,
  },
  tourMeta: {
    flexDirection: "row",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "white",
    marginLeft: 6,
  },
  tourFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "white",
    marginLeft: 5,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "white",
  },
  perPersonText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontFamily: "Inter-Medium",
    fontSize: 18,
    color: "#95a5a6",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#95a5a6",
    textAlign: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  activeFilterText: {
    color: "white",
  },
});

export default ToursScreen;
