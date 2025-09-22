import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Routes } from '../navigation/routes';

/**
 * Navigation utility functions for your app.
 * Each function navigates to a specific route with optional params.
 */

// Define your route names here

export const useAppNavigation = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const goToMainApp = (params?: any) => {
    navigation.navigate(Routes.MainApp, params);
  };

  const goToLogin = (params?: any) => {
    navigation.navigate(Routes.Login, params);
  };
  const goToPersonalDetails = (params?: any) => {
    navigation.navigate(Routes.PersonalDetails, params);
  };
  const goToProfileDetails = (params?: any) => {
    navigation.navigate(Routes.ProfileDetails, params);
  }

  const goToRestaurantDetails = (params?: any) => {
    navigation.navigate(Routes.RestaurantDetails, params);
  };

  const goToWithdraw = (params?: any) => {
    navigation.navigate(Routes.Withdraw, params);
  }

  const goToNotification = (params?: any) => {
    navigation.navigate(Routes.Notification, params);
  }

  const goToProfile = (params?: any) => {
    navigation.navigate(Routes.Profile, params);
  };

  const goToEditProfile = (params?: any) => {
    navigation.navigate(Routes.EditProfile, params);
  }

  const goToOrderDetails = (params?: any) => {
    navigation.navigate(Routes.OrderDetails, params);
  }

    const goToOrderTracking = (params?: any) => {
    navigation.navigate(Routes.OrderTracking, params);
  }

  const goToSOSScreen = (params?: any) => {
    navigation.navigate(Routes.SOSScreen, params);
  }

  const goToDetails = (id: string | number, params?: any) => {
    navigation.navigate(Routes.Dashboard, { id, ...params });
  };

  const goToMyOrders = (params?: any) => {
    navigation.navigate(Routes.MyOrders, params);
  }
  // Add more navigation functions as needed

  return {
    goToMainApp,
    goToLogin,
    goToPersonalDetails,
    goToProfileDetails,
    goToRestaurantDetails,
    goToDetails,
    goToWithdraw,
    goToNotification,
    goToProfile,
    goToEditProfile,
    goToOrderDetails,
    goToOrderTracking,
    goToSOSScreen,
    goToMyOrders
    // Add more here
  };
};