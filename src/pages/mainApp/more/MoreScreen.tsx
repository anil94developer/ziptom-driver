import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { useAppNavigation } from '../../../utils/functions';
import Header from '../../../componets/header';

const MoreScreen = () => {
  const { colors } = useTheme();
  const { goToProfile, goToWithdraw, goToNotification, goToSOSScreen ,goToMyOrders} = useAppNavigation();
  const [isOnline, setIsOnline] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Driver stats data
  const driverStats = {
    todayEarnings: '₹850',
    completedDeliveries: 12,
    rating: 4.8,
    totalDeliveries: 1247,
    onlineHours: '8h 30m',
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Add logout logic here
    Alert.alert('Logged Out', 'You have been successfully logged out.');
  };

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      icon: 'local-shipping',
      onPress: () => goToMyOrders(),
      badge: '3',
    },
    // {
    //   id: 'earnings',
    //   title: 'Earnings',
    //   icon: 'account-balance-wallet',
    //   onPress: () => console.log('Navigate to earnings'),
    // },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'person',
      onPress: goToProfile,
    },
    {
      id: 'withdraw',
      title: 'Withdraw Money',
      icon: 'payments',
      onPress: goToWithdraw,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications',
      onPress: goToNotification,
      badge: '5',
    },
    // {
    //   id: 'help',
    //   title: 'Help & Support',
    //   icon: 'help',
    //   onPress: () => console.log('Navigate to help'),
    // },
    // {
    //   id: 'settings',
    //   title: 'Settings',
    //   icon: 'settings',
    //   onPress: () => console.log('Navigate to settings'),
    // },
    {
      id: 'sos',
      title: 'Emergency SOS',
      icon: 'emergency',
      onPress: goToSOSScreen,
      isEmergency: true,
    },
  ];

  const quickActions = [
    {
      id: 'startShift',
      title: 'Start Shift',
      icon: 'play-arrow',
      color: colors.success,
      onPress: () => console.log('Start shift'),
    },
    {
      id: 'break',
      title: 'Take Break',
      icon: 'pause',
      color: colors.warning,
      onPress: () => console.log('Take break'),
    },
    {
      id: 'endShift',
      title: 'End Shift',
      icon: 'stop',
      color: colors.error,
      onPress: () => console.log('End shift'),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="More" onBack={() => {}} onAdd={undefined} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Driver Profile Section */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.background }]}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.driverName, { color: colors.text }]}>John Driver</Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color={colors.accent} />
                <Text style={[styles.rating, { color: colors.text }]}>{driverStats.rating}</Text>
                <Text style={[styles.totalDeliveries, { color: colors.textSecondary }]}>
                  • {driverStats.totalDeliveries} deliveries
                </Text>
              </View>
            </View>
            <View style={styles.onlineStatus}>
              <Switch
                value={isOnline}
                onValueChange={setIsOnline}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={isOnline ? colors.background : colors.textSecondary}
              />
              <Text style={[styles.statusText, { color: isOnline ? colors.success : colors.textSecondary }]}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        {/* <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{driverStats.todayEarnings}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today's Earnings</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <MaterialIcons name="local-shipping" size={24} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.text }]}>{driverStats.completedDeliveries}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <MaterialIcons name="schedule" size={24} color={colors.warning} />
            <Text style={[styles.statValue, { color: colors.text }]}>{driverStats.onlineHours}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Online Time</Text>
          </View>
        </View> */}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionButton, { backgroundColor: action.color }]}
                onPress={action.onPress}
              >
                <MaterialIcons name={action.icon} size={24} color={colors.background} />
                <Text style={[styles.quickActionText, { color: colors.background }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Menu</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                { 
                  backgroundColor: colors.surface,
                  borderBottomColor: colors.border,
                  borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                },
                item.isEmergency && styles.emergencyItem,
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={item.isEmergency ? colors.error : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    { color: item.isEmergency ? colors.error : colors.text },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                    <Text style={[styles.badgeText, { color: colors.background }]}>
                      {item.badge}
                    </Text>
                  </View>
                )}
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color={colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { borderColor: colors.error }]}
          onPress={() => setShowLogoutModal(true)}
        >
          <MaterialIcons name="logout" size={24} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <MaterialIcons name="logout" size={48} color={colors.error} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>Logout</Text>
            <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
              Are you sure you want to logout? You will need to login again to continue.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: colors.border }]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: colors.error }]}
                onPress={handleLogout}
              >
                <Text style={[styles.modalButtonText, { color: colors.background }]}>Logout</Text>
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
  profileCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  totalDeliveries: {
    fontSize: 14,
    marginLeft: 8,
  },
  onlineStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  emergencyItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
  confirmButton: {
    borderWidth: 0,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MoreScreen;
