import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomePage.jsx';
import SelectGamePage from './pages/SelectGamePage.jsx';
import TabComponent from './components/Tab';
import TabGame from './components/TabGame';
import ServersListPage from './pages/ServersListPage.jsx';
import AddServerPage from './pages/AddServerPage.jsx';
import UpdateServerPage from './pages/UpdateServerPage.jsx';
import UserServerPage from './pages/UserServerPage.jsx'
import ServerInfoPage from './pages/ServerInfoPage.jsx';
import ResetPassword from './pages/ResetPasswordPage.jsx';
import UserInfosPage from './pages/UserInfosPage.jsx';
import ResetMail from './pages/ResetMailPage.jsx';
import ParamsPage from './pages/ParamsPage';
import ConnectPage from './pages/ConnectPage';
import RegisterPage from './pages/RegisterPage';
import AuthAPI from './services/authAPI';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from "jwt-decode";
import ParamStack from "./routes/ParamStack.js"


import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function App() {

  // SecureStore.deleteItemAsync("token");

  // CHECK SI L'UTILISATEUR EST CO
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkLoginState = async () => {
    // retrieve the value of the token
    await SecureStore.getItemAsync("token").then(result => {
      if(result !== null ) {
            // {exp} => comme j'utilise que la propriété exp de l'objet jwtDecode, je le destructure et ne prend que exp
            const {exp} = jwtDecode(result);
    
            // console.log(exp, exp*1000, new Date().getTime());
    
            if(exp * 1000 > new Date().getTime()) {
                setIsAuthenticated(true);
            }
            else {
              setIsAuthenticated(false);
            }
      }
      else {
        setIsAuthenticated(false);
      }
    })
  };
  
   // call checkLoginState as soon as the component mounts
   useEffect(() => {
    checkLoginState();
   });
  // FIN DU CHECK

  // CHARGEMENT DES POLICES
  let [fontsLoaded] = useFonts({
    'TwCent': require('./assets/fonts/TCM.ttf'),
    'HomepageBaukasten': require ('./assets/fonts/HomepageBaukasten-Bold.otf')
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    // TAB NAV FOR CONNECTED USER
    if ( isAuthenticated === true ) {
      AuthAPI.setup();
      return (
        <NavigationContainer>
          <Tab.Navigator tabBarOptions={{ style: {height: Platform.OS === "ios" ?  80 : 60} }}>
            <Tab.Screen name="HomePage" component={HomePage} options={{ tabBarButton: (props) => <TabComponent page='HomePage' icon='home' />}}/>
            <Tab.Screen name="ServersListPage" component={ServersListPage} options={{ tabBarButton: (props) => <TabComponent page='ServersListPage' icon='list' />}} />
            <Tab.Screen name="SelectGamePage" component={SelectGamePage} options={{ tabBarButton: (props) => <TabGame page='SelectGamePage' icon='home' />}} />
            <Tab.Screen name="AddServerPage" component={AddServerPage} options={{ tabBarButton: (props) => <TabComponent page='AddServerPage' icon='plus' />}} />
            <Tab.Screen name="ProfilePage" component={ParamStack} options={{ tabBarButton: (props) => <TabComponent page='ProfilePage' icon='user-circle' />}} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
    // TAB NAV FOR NOT CONNECTED USER
    else {
      return (
        <NavigationContainer>
          <Tab.Navigator tabBarOptions={{ style: {height: Platform.OS === "ios" ?  80 : 60} }}>
            <Tab.Screen name="HomePage" component={HomePage} options={{ tabBarButton: (props) => <TabComponent page='HomePage' icon='home' />}}/>
            <Tab.Screen name="ServersListPage" component={ServersListPage} options={{ tabBarButton: (props) => <TabComponent page='ServersListPage' icon='list' />}} />
            <Tab.Screen name="SelectGamePage" component={SelectGamePage} options={{ tabBarButton: (props) => <TabGame page='SelectGamePage' icon='home' />}} />
            <Tab.Screen name="AddServerPage" component={AddServerPage} options={{ tabBarButton: (props) => <TabComponent page='AddServerPage' icon='plus' />}} />
            <Tab.Screen name="ProfilePage" component={ConnectPage} options={{ tabBarButton: (props) => <TabComponent page='ProfilePage' icon='user-circle' />}} />
          </Tab.Navigator>
        </NavigationContainer>
        // <UserServerPage/>
      );
    }
  }
}
