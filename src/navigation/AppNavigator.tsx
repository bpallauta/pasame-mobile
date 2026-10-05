import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import NewBillScreen from '../screens/NewBillScreen';
import DebtsScreen from '../screens/DebtsScreen';
import TeamsScreen from '../screens/TeamsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          backgroundColor: colors.surface,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarIcon: ({ focused }) => {
          let emoji = '🏠';
          if (route.name === 'Home') emoji = '🏠';
          else if (route.name === 'NewBill') emoji = '➕';
          else if (route.name === 'Debts') emoji = '💸';
          else if (route.name === 'Teams') emoji = '👥';
          else if (route.name === 'Profile') emoji = '⚙️';
          else if (route.name === 'Admin') emoji = '👑';
          
          return <Text style={{fontSize: 24, opacity: focused ? 1 : 0.5}}>{emoji}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="NewBill" component={NewBillScreen} options={{ title: 'Nueva cuenta' }} />
      <Tab.Screen name="Debts" component={DebtsScreen} options={{ title: 'Deudas' }} />
      <Tab.Screen name="Teams" component={TeamsScreen} options={{ title: 'Equipos' }} />
      {user?.role === 'admin' && (
        <Tab.Screen name="Admin" component={AdminPanelScreen} options={{ title: 'Panel' }} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
