import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomePage.jsx';
import SelectGamePage from './pages/SelectGamePage.jsx';
import TabComponent from './components/Tab';
import TabGame from './components/TabGame';
import ServersListPage from './pages/ServersListPage.jsx';
import AddServerPage from './pages/AddServerPage.jsx';
import ParamsPage from './pages/ParamsPage';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import ResetPassword from './pages/ResetPassword.jsx';
import ResetMail from './pages/ResetMail.jsx';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'TwCent': require('./assets/fonts/TCM.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomePage" component={ResetPassword} options={{ tabBarButton: (props) => <TabComponent page='HomePage' icon='home' />}}/>
        <Tab.Screen name="ServersListPage" component={ServersListPage} options={{ tabBarButton: (props) => <TabComponent page='ServersListPage' icon='list' />}} />
        <Tab.Screen name="SelectGamePage" component={SelectGamePage} options={{ tabBarButton: (props) => <TabGame page='SelectGamePage' icon='home' />}} />
        <Tab.Screen name="AddServerPage" component={AddServerPage} options={{ tabBarButton: (props) => <TabComponent page='AddServerPage' icon='add' />}} />
        <Tab.Screen name="ProfilePage" component={ParamsPage} options={{ tabBarButton: (props) => <TabComponent page='ProfilePage' icon='profile' />}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  }
}
