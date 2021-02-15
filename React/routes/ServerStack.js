import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServersListPage from "../pages/ServersListPage";
import ServerInfoPage from "../pages/ServerInfoPage";
import SelectGamePage from "../pages/SelectGamePage";

const Stack = createStackNavigator();

export default function ServerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen headerMode="none" name="ListServersPage" component={ServersListPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="ServerInfoPage" component={ServerInfoPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}