import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CameraScreen from './src/screens/CameraScreen';
import ReviewBillScreen from './src/screens/ReviewBillScreen';
import ParticipantsScreen from './src/screens/ParticipantsScreen';
import AssignItemsScreen from './src/screens/AssignItemsScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import SendChargeScreen from './src/screens/SendChargeScreen';
import ManualExpenseScreen from './src/screens/ManualExpenseScreen';
import TeamDetailScreen from './src/screens/TeamDetailScreen';
import SimplifyDebtsScreen from './src/screens/SimplifyDebtsScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token == null ? (
        // Pantallas sin Auth
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Pantallas con Auth
        <>
          <Stack.Screen name="MainTabs" component={AppNavigator} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="ReviewBill" component={ReviewBillScreen} />
          <Stack.Screen name="Participants" component={ParticipantsScreen} />
          <Stack.Screen name="AssignItems" component={AssignItemsScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
          <Stack.Screen name="SendCharge" component={SendChargeScreen} />
          <Stack.Screen name="ManualExpense" component={ManualExpenseScreen} />
          <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
          <Stack.Screen name="SimplifyDebts" component={SimplifyDebtsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
