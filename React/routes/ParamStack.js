import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParamsPage from "../pages/ParamsPage";
import UserInfosPage from "../pages/UserInfosPage";
import UserServerPage from "../pages/UserServerPage";
import UpdateServerPage from "../pages/UpdateServerPage";
import AddServerPage from "../pages/AddServerPage";


const Stack = createStackNavigator();

export default function ParamStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen headerMode="none" name="ParamsPage" component={ParamsPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="UserInfosPage" component={UserInfosPage} options={{ headerShown: false }}/>
      {/* Route pour la liste de mes serveurs */}
      <Stack.Screen headerMode="none" name="UserServerPage" component={UserServerPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="UpdateServerPage" component={UpdateServerPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="AddServerPage" component={AddServerPage} options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
}