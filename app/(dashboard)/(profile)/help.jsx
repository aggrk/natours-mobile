import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

const HelpScreen = () => {
  const faqs = [
    {
      question: "How do I cancel a booking?",
      answer:
        "You can cancel bookings up to 48 hours before the tour date in your bookings section.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
    {
      question: "How do I change my booking date?",
      answer:
        "Contact our support team at least 72 hours before your scheduled tour.",
    },
  ];

  const contactMethods = [
    {
      icon: "mail",
      name: "Email Support",
      details: "support@adventuretours.com",
      action: () => Linking.openURL("mailto:support@adventuretours.com"),
    },
    {
      icon: "phone",
      name: "Call Us",
      details: "+255 626 689 808",
      action: () => Linking.openURL("tel:+255626689808"),
    },
    {
      icon: "message-circle",
      name: "Live Chat",
      details: "Available 9AM-5PM EST",
      action: () => console.log("Initiate chat"),
    },
  ];

  const router = useRouter();

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
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={40}
            color="#2D6A4F"
          />
          <Text style={styles.welcomeTitle}>How can we help you?</Text>
          <Text style={styles.welcomeText}>
            Browse FAQs or contact our support team for assistance with
            bookings, payments, or any other questions.
          </Text>
        </View>

        {/* FAQs Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              activeOpacity={0.8}
            >
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
              <View style={styles.divider} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Section */}
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <View style={styles.contactContainer}>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={method.action}
              activeOpacity={0.8}
            >
              <View style={styles.contactIcon}>
                <Feather name={method.icon} size={24} color="#2D6A4F" />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{method.name}</Text>
                <Text style={styles.contactInfo}>{method.details}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#95a5a6" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources Section */}
        <Text style={styles.sectionTitle}>Resources</Text>
        <View style={styles.resourceContainer}>
          <TouchableOpacity style={styles.resourceCard} activeOpacity={0.8}>
            <Text style={styles.resourceText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceCard} activeOpacity={0.8}>
            <Text style={styles.resourceText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#1B4332",
    marginVertical: 10,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#1B4332",
    marginBottom: 15,
    marginLeft: 5,
  },
  faqContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 25,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  faqItem: {
    padding: 18,
  },
  faqQuestion: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    color: "#1B4332",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#555",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginTop: 16,
  },
  contactContainer: {
    marginBottom: 25,
  },
  contactCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  contactIcon: {
    backgroundColor: "rgba(45, 106, 79, 0.1)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    color: "#1B4332",
    marginBottom: 2,
  },
  contactInfo: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#95a5a6",
  },
  resourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resourceCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    shadowColor: "#1B4332",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  resourceText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#2D6A4F",
    textAlign: "center",
  },
});

export default HelpScreen;
