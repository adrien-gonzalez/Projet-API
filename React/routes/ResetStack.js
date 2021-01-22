import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConnectPage from "../pages/ConnectPage";
import RegisterPage from "../pages/RegisterPage";
import ResetMailPage from "../pages/ResetMailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const Stack = createStackNavigator();

export default function ResetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen headerMode="none" name="ConnectPage" component={ConnectPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="RegisterPage" component={RegisterPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="ResetPasswordPage" component={ResetPasswordPage} options={{ headerShown: true }}/>
      <Stack.Screen headerMode="none" name="ResetMailPage" component={ResetMailPage} options={{ headerShown: true }}/>
    </Stack.Navigator>
  );
}