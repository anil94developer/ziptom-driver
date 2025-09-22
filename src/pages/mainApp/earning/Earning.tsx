import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAppNavigation } from "../../../utils/functions";

const trips = [
  { id: "301", date: "16 Sep 2025", orderId: "#1452", earning: "₹120", status: "Paid" },
  { id: "302", date: "16 Sep 2025", orderId: "#1453", earning: "₹80", status: "Pending" },
  { id: "303", date: "15 Sep 2025", orderId: "#1448", earning: "₹150", status: "Paid" },
];

const EarningsScreen = () => {
  const {goToWithdraw}= useAppNavigation();
  return (
    <View style={styles.container}>
      {/* 🔝 Header */}
      <View style={styles.header}>
        <Text style={styles.title}>💰 My Earnings</Text>
      </View>

      {/* 📊 Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Today</Text>
          <Text style={styles.summaryValue}>₹200</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>This Week</Text>
          <Text style={styles.summaryValue}>₹3,250</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: "#E8F5E9" }]}>
          <Text style={[styles.summaryLabel, { color: "#2E7D32" }]}>Total Earnings</Text>
          <Text style={[styles.summaryValue, { color: "#2E7D32" }]}>₹12,540</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Payout</Text>
          <TouchableOpacity style={styles.payoutBtn} onPress={()=>{goToWithdraw()}}>
            <MaterialIcons name="payments" size={18} color="#fff" />
            <Text style={styles.payoutText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🛵 Recent Trips */}
      <Text style={styles.sectionTitle}>Recent Trips</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tripCard}>
            <View>
              <Text style={styles.tripDate}>{item.date}</Text>
              <Text style={styles.tripOrder}>Order {item.orderId}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.tripEarning}>{item.earning}</Text>
              <Text
                style={[
                  styles.tripStatus,
                  { color: item.status === "Paid" ? "#2E7D32" : "#F57C00" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 16 },

  header: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#212121" },

  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    elevation: 2,
  },
  summaryLabel: { fontSize: 13, color: "#666" },
  summaryValue: { fontSize: 18, fontWeight: "bold", marginTop: 6, color: "#212121" },

  payoutBtn: {
    flexDirection: "row",
    backgroundColor: "#1976D2",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 6,
  },
  payoutText: { color: "#fff", fontWeight: "bold", marginLeft: 4, fontSize: 13 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 12 },

  tripCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  tripDate: { fontSize: 13, color: "#757575" },
  tripOrder: { fontSize: 14, fontWeight: "600", color: "#333" },
  tripEarning: { fontSize: 16, fontWeight: "bold", color: "#FF5722" },
  tripStatus: { fontSize: 12, fontWeight: "bold", marginTop: 2 },
});

export default EarningsScreen;
