import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/mainApp/home/HomeScreen';
import MyOrderScreen from '../pages/mainApp/myOrder/MyOrder';
import EarningsScreen from '../pages/mainApp/earning/Earning';
import MoreScreen from '../pages/mainApp/more/MoreScreen';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            }}
            initialRouteName='Home'
        >
            

            <Tab.Screen
                name="EarningTab"
                component={EarningsScreen}
                options={{
                    tabBarLabel: 'Earning',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="money" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ position: 'absolute', top: -40, backgroundColor: colors.primary, borderRadius: 360, padding: 6,width:60,height:60,justifyContent:'center',alignItems:'center' }}>
                            <MaterialIcons name="home" size={size} color={'#fff'} />
                        </View>
                    ),
                }}
            />
 

            <Tab.Screen
                name="More"
                component={MoreScreen}
                options={{
                    tabBarLabel: 'More',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="list" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
