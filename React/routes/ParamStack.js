import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParamsPage from "../pages/ParamsPage";
import UserInfosPage from "../pages/UserInfosPage";

const Stack = createStackNavigator();

export default function ParamStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen headerMode="none" name="ParamsPage" component={ParamsPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="UserInfosPage" component={UserInfosPage} options={{ headerShown: false }}/>
      {/* Route pour la liste de mes serveurs */}
      {/* <Stack.Screen headerMode="none" name="" component={} options={{ headerShown: false }}/> */} 
    </Stack.Navigator>
  );
}