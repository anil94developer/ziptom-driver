import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../../../componets/header";
import { useAppNavigation } from "../../../utils/functions";
import { useNavigation } from "@react-navigation/native";

const initialNotifications = [
  {
    id: "1",
    title: "Order Confirmed",
    message: "Your food order #1234 has been confirmed.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Delivery Update",
    message: "Your order is out for delivery 🚚",
    time: "10 min ago",
    read: false,
  },
  {
    id: "3",
    title: "Payment Successful",
    message: "₹550 has been paid successfully.",
    time: "1 hr ago",
    read: true,
  },
  {
    id: "4",
    title: "Offer Alert 🎉",
    message: "Flat 20% OFF on your next order.",
    time: "Yesterday",
    read: true,
  },
];

const NotificationScreen = () => {
    const navigation = useNavigation()
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, !item.read && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <MaterialIcons
        name={item.read ? "notifications-none" : "notifications-active"}
        size={28}
        color={item.read ? "#666" : "#FF6F00"}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, !item.read && styles.unreadTitle]}>
          {item.title}
        </Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
      title={'Notification'}
      onBack={()=>{navigation.goBack()}}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",},
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  unreadCard: { backgroundColor: "#FFF3E0" },

  textContainer: { marginLeft: 12, flex: 1 },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  unreadTitle: { color: "#FF6F00" },

  message: { fontSize: 14, color: "#666", marginVertical: 2 },
  time: { fontSize: 12, color: "#999" },
});

export default NotificationScreen;
