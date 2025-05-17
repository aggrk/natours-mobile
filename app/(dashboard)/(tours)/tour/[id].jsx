import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import { Rating } from "react-native-ratings";
import ImageViewer from "react-native-image-zoom-viewer";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

const { width } = Dimensions.get("window");

const URL = "https://natours-api-chd9.onrender.com/api/v1";
const IMG = "https://natours-api-chd9.onrender.com/img";

const TourDetailsScreen = () => {
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${URL}/tours/${id}`, {
          withCredentials: true,
        });

        const tourData = res.data.data.data;
        setTour(tourData);
      } catch (err) {
        console.log(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, []);
  {
    const handleBookPress = () => {
      router.push(`/booking/${tour._id}`);
    };

    const handleShare = async () => {
      try {
        await Share.share({
          message: `Check out this amazing tour: ${tour.name} - ${tour.summary}`,
          url: tour.imageCover,
          title: tour.name,
        });
      } catch (error) {
        console.log("Share error:", error.message);
      }
    };

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const openImageGallery = (index) => {
      if (tour.images && tour.images.length > 0) {
        setActiveImageIndex(index);
        setIsGalleryOpen(true);
      }
    };

    // Validate images for ImageViewer
    const validImages = Array.isArray(tour.images)
      ? tour.images
          .filter((img) => typeof img === "string" && img.startsWith("http"))
          .map((img) => ({ url: img }))
      : [];

    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#2e8b57" />
          <Text
            style={{
              marginTop: 10,
              color: "#2e8b57",
              fontFamily: "Inter-Medium",
            }}
          >
            Loading tour
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* Image Gallery Modal */}
        {isGalleryOpen && validImages.length > 0 ? (
          <View style={StyleSheet.absoluteFill}>
            <ImageViewer
              imageUrls={validImages}
              index={activeImageIndex}
              onSwipeDown={() => setIsGalleryOpen(false)}
              enableSwipeDown={true}
              style={styles.imageGallery}
              backgroundColor="black"
              onError={(error) => console.log("ImageViewer error:", error)}
            />
            <TouchableOpacity
              style={styles.closeGalleryButton}
              onPress={() => setIsGalleryOpen(false)}
            >
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          isGalleryOpen && (
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>No images available</Text>
              <TouchableOpacity
                style={styles.closeGalleryButton}
                onPress={() => setIsGalleryOpen(false)}
              >
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>
          )
        )}

        {/* Main Content */}
        {!isGalleryOpen && (
          <>
            {/* Hero Image with Gradient */}
            <ScrollView>
              <View style={styles.heroContainer}>
                <Image
                  source={{
                    uri: `${IMG}/tours/${tour.imageCover}`,
                  }}
                  style={styles.heroImage}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.7)"]}
                  style={styles.gradientOverlay}
                />
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleShare}
                >
                  <Feather name="share-2" size={20} color="white" />
                </TouchableOpacity>
              </View>

              {/* Quick Facts */}
              <View style={styles.quickFacts}>
                <View style={styles.factItem}>
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color="#40916C"
                  />
                  <Text style={styles.factText}>{tour.duration} days</Text>
                </View>
                <View style={styles.factItem}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={20}
                    color="#40916C"
                  />
                  <Text style={styles.factText}>Max {tour.maxGroupSize}</Text>
                </View>
                <View style={styles.factItem}>
                  <MaterialIcons name="landscape" size={20} color="#40916C" />
                  <Text style={styles.factText}>
                    {tour.difficulty?.charAt(0).toUpperCase() +
                      tour.difficulty?.slice(1)}
                  </Text>
                </View>
              </View>

              {/* Main Content */}
              <View style={styles.contentContainer}>
                {/* Tour Title and Rating */}
                <View style={styles.titleContainer}>
                  <Text style={styles.tourTitle}>{tour.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Rating
                      type="star"
                      ratingCount={5}
                      imageSize={18}
                      readonly
                      startingValue={tour.ratingsAverage || 0}
                      tintColor="#F8F9FA"
                    />
                    <Text style={styles.ratingText}>
                      ({tour.ratingsQuantity || 0} reviews)
                    </Text>
                  </View>
                </View>

                {/* Price */}
                <Text style={styles.price}>${tour.price} per person</Text>

                {/* Summary */}
                <Text style={styles.sectionTitle}>About this tour</Text>
                <Text style={styles.tourDescription}>{tour.description}</Text>

                {/* Image Gallery Preview */}
                <Text style={styles.sectionTitle}>Gallery</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.galleryContainer}
                >
                  {(tour.images || []).map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openImageGallery(index)}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={{
                          uri:
                            `${IMG}/tours/${image}` ||
                            "https://via.placeholder.com/120",
                        }}
                        style={styles.galleryImage}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Start Dates */}
                <Text style={styles.sectionTitle}>Available Dates</Text>
                <View style={styles.datesContainer}>
                  {(tour.startDates || []).map((date, index) => (
                    <View key={index} style={styles.dateItem}>
                      <MaterialIcons name="event" size={18} color="#40916C" />
                      <Text style={styles.dateText}>{formatDate(date)}</Text>
                    </View>
                  ))}
                </View>

                {/* Guides */}
                <Text style={styles.sectionTitle}>Your Guides</Text>
                <View style={styles.guidesContainer}>
                  {(tour.guides || []).map((guide, index) => (
                    <View key={index} style={styles.guideItem}>
                      <Image
                        source={{
                          uri:
                            `${IMG}/users/${guide.photo}` ||
                            "https://via.placeholder.com/50",
                        }}
                        style={styles.guideImage}
                      />
                      <View style={styles.guideInfo}>
                        <Text style={styles.guideName}>{guide.name}</Text>
                        <Text style={styles.guideRole}>{guide.role}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Map */}
                <Text style={styles.sectionTitle}>Tour Locations</Text>
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: tour.startLocation?.coordinates[1] || 51.1784,
                      longitude:
                        tour.startLocation?.coordinates[0] || -115.5708,
                      latitudeDelta: 0.5,
                      longitudeDelta: 0.5,
                    }}
                  >
                    {(tour.locations || []).map((location, index) => (
                      <Marker
                        key={index}
                        coordinate={{
                          latitude: location.coordinates[1],
                          longitude: location.coordinates[0],
                        }}
                        title={`Day ${location.day}`}
                        description={location.description}
                      >
                        <View style={styles.marker}>
                          <Text style={styles.markerText}>{location.day}</Text>
                        </View>
                      </Marker>
                    ))}
                  </MapView>
                </View>
              </View>
            </ScrollView>

            {/* Fixed Book Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={handleBookPress}
              >
                <LinearGradient
                  colors={["#2D6A4F", "#40916C"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                  <Text style={styles.bookButtonSubtext}>
                    ${tour.price} per person
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  heroContainer: {
    height: 300,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  shareButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  quickFacts: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "white",
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  factItem: {
    alignItems: "center",
  },
  factText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#1B4332",
    marginTop: 5,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  titleContainer: {
    marginBottom: 10,
  },
  tourTitle: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#95a5a6",
    marginLeft: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#2D6A4F",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginTop: 25,
    marginBottom: 15,
  },
  tourDescription: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 5,
  },
  galleryContainer: {
    paddingBottom: 10,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  datesContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  dateText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#1B4332",
    marginLeft: 10,
  },
  guidesContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  guideImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  guideInfo: {
    flex: 1,
  },
  guideName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#1B4332",
  },
  guideRole: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#95a5a6",
  },
  mapContainer: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: "#2D6A4F",
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  markerText: {
    color: "white",
    fontFamily: "Inter-Bold",
    fontSize: 12,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#D8F3DC",
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  bookButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  bookButtonText: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "white",
  },
  bookButtonSubtext: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  closeGalleryButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  imageGallery: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "white",
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
});
export default TourDetailsScreen;
