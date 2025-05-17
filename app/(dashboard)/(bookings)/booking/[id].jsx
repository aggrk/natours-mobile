import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

const URL = "https://natours-api-chd9.onrender.com/api/v1";
const IMG = "https://natours-api-chd9.onrender.com/img/tours";

const BookingScreen = () => {
  // State management
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const { id } = useLocalSearchParams();

  // Format date to display
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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

  // Handle booking confirmation
  const handleBookNow = () => {
    console.log("Book now");
  };

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
          Loading tour
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Tour Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: `${IMG}/${tour.imageCover}` }}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradientOverlay}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.tourTitle}>{tour.name}</Text>
        <View style={styles.tourMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={16} color="#FFD166" />
            <Text style={styles.metaText}>
              {tour?.startLocation?.description}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <FontAwesome name="calendar" size={16} color="#FFD166" />
            <Text style={styles.metaText}>{tour.duration} days</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people" size={16} color="#FFD166" />
            <Text style={styles.metaText}>Max {tour.maxGroupSize} people</Text>
          </View>
        </View>
      </View>

      {/* Booking Details Card */}
      <View style={styles.bookingCard}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>${tour.price * guests}</Text>
        </View>

        {/* Date Selection */}
        <TouchableOpacity
          style={styles.bookingField}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={styles.fieldIcon}>
            <MaterialIcons name="date-range" size={20} color="#40916C" />
          </View>
          <Text style={styles.fieldText}>Select Date</Text>
          <Text style={styles.fieldValue}>{formattedDate}</Text>
          <MaterialIcons name="chevron-right" size={20} color="#95a5a6" />
        </TouchableOpacity>

        {/* Guest Selection */}
        <View style={styles.bookingField}>
          <View style={styles.fieldIcon}>
            <MaterialCommunityIcons
              name="account-group"
              size={20}
              color="#40916C"
            />
          </View>
          <Text style={styles.fieldText}>Number of Guests</Text>
          <View style={styles.guestSelector}>
            <TouchableOpacity
              onPress={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              <MaterialIcons
                name="remove-circle"
                size={28}
                color={guests <= 1 ? "#cccccc" : "#2D6A4F"}
              />
            </TouchableOpacity>
            <Text style={styles.guestCount}>{guests}</Text>
            <TouchableOpacity
              onPress={() => setGuests(Math.min(tour.maxGroupSize, guests + 1))}
            >
              <MaterialIcons
                name="add-circle"
                size={28}
                color={guests >= tour.maxGroupSize ? "#cccccc" : "#2D6A4F"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tour Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tour Summary</Text>
          <Text style={styles.summaryText}>{tour.summary}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD166" />
            <Text style={styles.ratingText}>
              {tour.ratingsAverage} ({tour.ratingsQuantity} reviews)
            </Text>
          </View>
        </View>

        {/* Payment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="credit-card"
              size={20}
              color="#40916C"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#95a5a6"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <MaterialIcons
                name="event"
                size={20}
                color="#40916C"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#95a5a6"
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <MaterialIcons
                name="lock"
                size={20}
                color="#40916C"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                placeholderTextColor="#95a5a6"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <LinearGradient
            colors={["#2D6A4F", "#40916C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
            <Text style={styles.bookButtonSubtext}>
              ${tour.price * guests} total
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F3DC",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroContainer: {
    height: 300,
    justifyContent: "flex-end",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
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
  tourTitle: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    color: "white",
    marginHorizontal: 20,
    marginBottom: 8,
  },
  tourMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 8,
  },
  metaText: {
    color: "white",
    fontFamily: "Inter-Medium",
    fontSize: 14,
    marginLeft: 6,
  },
  bookingCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  priceLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#555",
  },
  priceValue: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#1B4332",
  },
  bookingField: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D8F3DC",
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(64, 145, 108, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  fieldText: {
    flex: 1,
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#1B4332",
  },
  fieldValue: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#95a5a6",
    marginRight: 10,
  },
  guestSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  guestCount: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#1B4332",
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: "center",
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "#1B4332",
    marginBottom: 15,
  },
  summaryText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#1B4332",
    paddingVertical: 0,
  },
  row: {
    flexDirection: "row",
  },
  bookButton: {
    marginTop: 30,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: "center",
  },
  bookButtonText: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "white",
    marginBottom: 4,
  },
  bookButtonSubtext: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
});

export default BookingScreen;
