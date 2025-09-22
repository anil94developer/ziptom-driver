import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Switch,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAppNavigation } from "../../../utils/functions";
import { useTheme } from "../../../theme/ThemeContext";

const activeOrders = [
  {
    id: "201",
    restaurant: "Pizza Hut",
    customer: "Ravi Kumar",
    address: "Sector 22, Noida",
    price: "₹450",
    status: "Pickup",
    time: "15 mins",
    distance: "2.3 km",
    items: 3,
  },
  {
    id: "202",
    restaurant: "Burger King",
    customer: "Neha Sharma",
    address: "Connaught Place, Delhi",
    price: "₹299",
    status: "Deliver",
    time: "8 mins",
    distance: "1.1 km",
    items: 2,
  },
  {
    id: "203",
    restaurant: "McDonald's",
    customer: "Amit Singh",
    address: "Rajouri Garden, Delhi",
    price: "₹180",
    status: "Pickup",
    time: "25 mins",
    distance: "4.2 km",
    items: 1,
  },
];

const DeliveryBoyHome = () => {
  const { colors } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const { goToWithdraw, goToNotification, goToSOSScreen } = useAppNavigation();

  // Driver stats
  const driverStats = {
    todayEarnings: '₹1,250',
    completedOrders: 12,
    rating: 4.8,
    onlineTime: '8h 30m',
    totalEarnings: '₹15,420',
  };

  const handleAction = (order: any) => {
    setSelectedOrder(order);
  };

  const confirmAction = () => {
    if (selectedOrder) {
      console.log(`✅ Order ${selectedOrder.id} marked as ${selectedOrder.status}`);
    }
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pickup': return colors.warning;
      case 'Deliver': return colors.success;
      default: return colors.primary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pickup': return 'restaurant';
      case 'Deliver': return 'local-shipping';
      default: return 'help';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      {/* Enhanced Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.headerButton} onPress={goToSOSScreen}>
            <MaterialIcons name="sos" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={goToNotification}>
            <MaterialIcons name="notifications-none" size={20} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcome}>Welcome Back! 👋</Text>
            <Text style={styles.driverName}>John Driver</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: isOnline ? colors.success : colors.error }]} />
              <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
              <Switch
                value={isOnline}
                onValueChange={setIsOnline}
                trackColor={{ false: colors.border, true: colors.success }}
                thumbColor={isOnline ? colors.background : colors.textSecondary}
                style={styles.statusSwitch}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.walletCard} onPress={goToWithdraw}>
            <View style={styles.walletContent}>
              <MaterialIcons name="account-balance-wallet" size={24} color="#fff" />
              <View style={styles.walletInfo}>
                <Text style={styles.walletLabel}>Available Balance</Text>
                <Text style={styles.walletAmount}>{driverStats.todayEarnings}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Enhanced Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.surface,flexDirection:'row',gap:30 }]}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
              <MaterialIcons name="local-shipping" size={24} color={colors.primary} />
            </View>
            <View>
            <Text style={[styles.statValue, { color: colors.text }]}>{driverStats.completedOrders}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today's Orders</Text>
            </View>
            </View>
          
          {/* <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.statIcon, { backgroundColor: colors.success + '20' }]}>
              <MaterialIcons name="star" size={24} color={colors.success} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{driverStats.rating}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rating</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.statIcon, { backgroundColor: colors.warning + '20' }]}>
              <MaterialIcons name="schedule" size={24} color={colors.warning} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{driverStats.onlineTime}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Online Time</Text>
          </View> */}
        </View>

        {/* Quick Actions */}
        {/* <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.success }]}>
              <MaterialIcons name="play-arrow" size={24} color="#fff" />
              <Text style={styles.quickActionText}>Start Shift</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.warning }]}>
              <MaterialIcons name="pause" size={24} color="#fff" />
              <Text style={styles.quickActionText}>Take Break</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.error }]}>
              <MaterialIcons name="stop" size={24} color="#fff" />
              <Text style={styles.quickActionText}>End Shift</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Active Orders Section */}
        <View style={styles.ordersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Orders</Text>
            <Text style={[styles.orderCount, { color: colors.textSecondary }]}>
              {activeOrders.length} orders
            </Text>
          </View>

          {activeOrders.map((item) => (
            <View key={item.id} style={[styles.orderCard, { backgroundColor: colors.surface }]}>
              <View style={styles.orderHeader}>
                <View style={styles.restaurantInfo}>
                  <View style={[styles.restaurantIcon, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <MaterialIcons name={getStatusIcon(item.status)} size={20} color={getStatusColor(item.status)} />
                  </View>
                  <View>
                    <Text style={[styles.restaurantName, { color: colors.text }]}>{item.restaurant}</Text>
                    <Text style={[styles.orderId, { color: colors.textSecondary }]}>Order #{item.id}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.statusBadgeText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.customerInfo}>
                  <MaterialIcons name="person" size={16} color={colors.textSecondary} />
                  <Text style={[styles.customerName, { color: colors.text }]}>{item.customer}</Text>
                </View>
                <View style={styles.addressInfo}>
                  <MaterialIcons name="location-on" size={16} color={colors.textSecondary} />
                  <Text style={[styles.address, { color: colors.textSecondary }]}>{item.address}</Text>
                </View>
              </View>

              <View style={styles.orderMeta}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="schedule" size={14} color={colors.textSecondary} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>{item.time}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="directions" size={14} color={colors.textSecondary} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>{item.distance}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="shopping-bag" size={14} color={colors.textSecondary} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>{item.items} items</Text>
                </View>
              </View>

              <View style={styles.orderFooter}>
                <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: getStatusColor(item.status) }]}
                  onPress={() => handleAction(item)}
                >
                  <Text style={styles.actionButtonText}>
                    {item.status === "Pickup" ? "Mark Picked" : "Mark Delivered"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Enhanced Confirmation Modal */}
      <Modal visible={!!selectedOrder} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
            <View style={[styles.modalIcon, { backgroundColor: colors.primary + '20' }]}>
              <MaterialIcons name="help-outline" size={32} color={colors.primary} />
            </View>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Confirm Action</Text>
            {selectedOrder && (
              <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
                Are you sure you want to mark order #{selectedOrder.id} as {selectedOrder.status}?
              </Text>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { borderColor: colors.border }]}
                onPress={() => setSelectedOrder(null)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: colors.primary }]}
                onPress={confirmAction}
              >
                <Text style={[styles.modalButtonText, { color: colors.background }]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop:40
  },

  // Header Styles
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  welcomeSection: {
    flex: 1,
  },
  welcome: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 8,
    fontWeight: '500',
  },
  statusSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 140,
  },
  walletContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  walletInfo: {
    marginLeft: 12,
  },
  walletLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  walletAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Quick Actions
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  // Orders Container
  ordersContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderCard: {
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  restaurantIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  orderId: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDetails: {
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  address: {
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryBoyHome;
