import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParamsPage from "../pages/ParamsPage";
import UserInfosPage from "../pages/UserInfosPage";
import UserServerPage from "../pages/UserServerPage";
import UpdateServerPage from "../pages/UpdateServerPage";
import ConnectPage from "../pages/ConnectPage";
import RegisterPage from "../pages/RegisterPage";
import ResetMailPage from "../pages/ResetMailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AddServerPage from "../pages/AddServerPage";
import ServerInfoPage from '../pages/ServerInfoPage';

const Stack = createStackNavigator();

export default function ParamStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen headerMode="none" name="ParamsPage" component={ParamsPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="UserInfosPage" component={UserInfosPage} options={{ headerShown: false }}/>
      {/* Route pour la liste de mes serveurs */}
      <Stack.Screen headerMode="none" name="AddServerPage" component={AddServerPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="UserServerPage" component={UserServerPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="UpdateServerPage" component={UpdateServerPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="ServerInfoPage" component={ServerInfoPage} options={{ headerShown: false }}/>
      {/* Route connexion/inscription */}
      <Stack.Screen headerMode="none" name="ConnectPage" component={ConnectPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="RegisterPage" component={RegisterPage} options={{ headerShown: false }}/>
      {/* Route Reset Mdp */}
      <Stack.Screen headerMode="none" name="ResetMailPage" component={ResetMailPage} options={{ headerShown: false }}/>
      <Stack.Screen headerMode="none" name="ResetPasswordPage" component={ResetPasswordPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}