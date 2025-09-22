import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppTextInput from "../../componets/textInput";
import AppButton from "../../componets/appButton";
import { useAppNavigation } from "../../utils/functions";

const PersonalDetails = () => {
  const { goToProfileDetails } = useAppNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState("bike");
  const [vehicleNumber, setVehicleNumber] = useState("");

  return (
    <View style={styles.container}>
      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <AppTextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
        style={styles.input}
      />

      {/* Phone Number */}
      {/* <Text style={styles.label}>Phone Number</Text>
      <AppTextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        style={styles.input}
      /> */}

      {/* Email */}
      {/* <Text style={styles.label}>Email Address</Text>
      <AppTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.input}
      /> */}

      {/* Vehicle Type */}
      <Text style={styles.label}>Select Vehicle Type</Text>
      <View style={styles.row}>
        {["bike", "car", "van"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.vehicleBtn,
              vehicleType === type && styles.vehicleBtnActive,
            ]}
            onPress={() => setVehicleType(type)}
          >
            <Text
              style={[
                styles.vehicleText,
                vehicleType === type && styles.vehicleTextActive,
              ]}
            >
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Vehicle Number */}
      <Text style={styles.label}>Vehicle Number</Text>
      <AppTextInput
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        placeholder="Enter your vehicle number"
        style={styles.input}
      />

      {/* Submit */}
      <AppButton
        label="Submit"
        onPress={() => goToProfileDetails()}
        error="Something went wrong"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 16, color: "#222", marginTop: 18, marginBottom: 8 },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    paddingHorizontal: 14,
    fontSize: 16,
    height: 48,
    marginBottom: 8,
  },
  row: { flexDirection: "row", marginBottom: 12 },
  vehicleBtn: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  vehicleBtnActive: {
    backgroundColor: "#FF3366",
    borderColor: "#FF3366",
  },
  vehicleText: { fontSize: 14, color: "#222" },
  vehicleTextActive: { color: "#fff", fontWeight: "bold" },
});

export default PersonalDetails;
