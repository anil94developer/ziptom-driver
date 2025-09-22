import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../../../componets/header";
import { useNavigation } from "@react-navigation/native";

const emergencyContacts = [
  { id: "1", name: "Police", number: "100", icon: "local-police" },
  { id: "2", name: "Ambulance", number: "108", icon: "local-hospital" },
  { id: "3", name: "Fire Brigade", number: "101", icon: "fire-truck" },
];

const SOSScreen = () => {
  const navigation = useNavigation()
  const handleSOS = () => {
    Alert.alert("🚨 SOS Sent", "Your emergency alert has been triggered!");
    // You can integrate GPS + API call here
  };

  const handleCall = (contact: any) => {
    Alert.alert("📞 Calling", `${contact.name} (${contact.number})`);
    // Linking.openURL(`tel:${contact.number}`);
  };

  return (
    <View style={styles.container}>

      {/* 🔝 Header */}
      <Header
        title={'SOS Emergency'}
        onBack={() => { navigation.goBack() }}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.header}>🚨 Emergency SOS</Text>

        {/* 🔴 SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        <Text style={styles.subText}>Tap to send emergency alert</Text>

        {/* 📞 Emergency Contacts */}
        <Text style={styles.sectionTitle}>Quick Emergency Contacts</Text>
        <FlatList
          data={emergencyContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => handleCall(item)}
            >
              <MaterialIcons name={item.icon} size={28} color="#E53935" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactNumber}>{item.number}</Text>
              </View>
              <MaterialIcons name="call" size={24} color="#4CAF50" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#E53935" },

  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  sosText: { fontSize: 48, fontWeight: "bold", color: "#fff" },
  subText: { textAlign: "center", color: "#666", marginBottom: 20 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  contactName: { fontSize: 16, fontWeight: "bold" },
  contactNumber: { fontSize: 14, color: "#666" },
});

export default SOSScreen;
