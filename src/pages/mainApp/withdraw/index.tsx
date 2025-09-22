import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../../../componets/header";
import { useNavigation } from "@react-navigation/native";

const withdrawRequests = [
  { id: "1", date: "16 Sep 2025", amount: "₹500", status: "Pending" },
  { id: "2", date: "14 Sep 2025", amount: "₹1200", status: "Approved" },
  { id: "3", date: "10 Sep 2025", amount: "₹700", status: "Paid" },
];

const WithdrawScreen = () => {
    const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");

  const handleRequest = () => {
    console.log("Withdraw Request:", amount, upiId);
    setModalVisible(false);
    setAmount("");
    setUpiId("");
  };

  return (
    <View style={styles.container}>
      {/* 🔝 Header */}
      <Header
      title={'Withdraw '}
       onBack={()=>{navigation.goBack()}}
      />
      <View style={{padding: 16}}>
      <View style={styles.header}>
        <Text style={styles.title}>💵 Withdraw Requests</Text>
        <TouchableOpacity
          style={styles.newRequestBtn}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add-circle" size={22} color="#fff" />
          <Text style={styles.newRequestText}>New Request</Text>
        </TouchableOpacity>
      </View>

      {/* 📋 Withdraw List */}
      <FlatList
        data={withdrawRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status === "Paid"
                      ? "#2E7D32"
                      : item.status === "Approved"
                      ? "#1565C0"
                      : "#F57C00",
                },
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />

      {/* 🔹 Withdraw Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Request Withdrawal</Text>

            <TextInput
              placeholder="Enter Amount"
              keyboardType="numeric"
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
            />

            {/* <TextInput
              placeholder="Enter UPI ID / Bank Details"
              style={styles.input}
              value={upiId}
              onChangeText={setUpiId}
            /> */}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleRequest}>
                <Text style={styles.btnText}>Send Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5",  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#212121" },
  newRequestBtn: {
    flexDirection: "row",
    backgroundColor: "#1976D2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  newRequestText: { color: "#fff", marginLeft: 6, fontWeight: "bold" },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  amount: { fontSize: 16, fontWeight: "bold", color: "#000" },
  date: { fontSize: 12, color: "#666", marginTop: 2 },
  status: { fontSize: 14, fontWeight: "bold" },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  cancelBtn: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  submitBtn: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "bold" },
});

export default WithdrawScreen;
