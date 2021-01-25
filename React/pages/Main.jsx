import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage.jsx';
import SelectGamePage from './SelectGamePage.jsx';
import TabComponent from '../components/Tab';
import TabGame from '../components/TabGame';
import ServersListPage from './ServersListPage.jsx';
import AddServerPage from './AddServerPage.jsx';
import ServerInfoPage from './ServerInfoPage.jsx';
import ResetPassword from './ResetPasswordPage.jsx';
import UserInfosPage from './UserInfosPage.jsx';
import ResetMail from './ResetMailPage.jsx';
import ParamsPage from './ParamsPage';
import ConnectPage from './ConnectPage';
import RegisterPage from './RegisterPage';
import AuthAPI from '../services/authAPI';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';


const Tab = createBottomTabNavigator();

const Main = (props) => {

    // SecureStore.deleteItemAsync("token");

    const _updateIsLogged = (isLogged) => {
        const action = { type: "UPDATE_ISLOGGED", value: {isLogged: isLogged} }
        props.dispatch(action)
        // console.log(id)
    }

    // CHECK SI L'UTILISATEUR EST CO
    const checkLoginState = async () => {
        // retrieve the value of the token
        await SecureStore.getItemAsync("token").then(result => {
            if(result !== null ) {
                // {exp} => comme j'utilise que la propriété exp de l'objet jwtDecode, je le destructure et ne prend que exp
                const {exp} = jwtDecode(result);
        
                // console.log(exp, exp*1000, new Date().getTime());
        
                if(exp * 1000 > new Date().getTime()) {
                    if (props.auth.isLogged != true) _updateIsLogged(true);
                }
                else {
                    if (props.auth.isLogged != false) _updateIsLogged(false);
                }
            }
            else {
                if (props.auth.isLogged != false) _updateIsLogged(false);
            }
        })
    }
  
    // call checkLoginState as soon as the component mounts
    useEffect(() => {
        checkLoginState();
        // console.log(props);
    });
    // FIN DU CHECK

    // CHARGEMENT DES POLICES
    let [fontsLoaded] = useFonts({
        'TwCent': require('../assets/fonts/TCM.ttf'),
        'HomepageBaukasten': require ('../assets/fonts/HomepageBaukasten-Bold.otf')
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        if (props.auth.isLogged === true ) AuthAPI.setup();
        return (
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{ style: {height: Platform.OS === "ios" ?  80 : 60} }}>
                <Tab.Screen name="HomePage" component={HomePage} options={{ tabBarButton: (props) => <TabComponent page='HomePage' icon='home' />}}/>
                <Tab.Screen name="ServersListPage" component={ServersListPage} options={{ tabBarButton: (props) => <TabComponent page='ServersListPage' icon='list' />}} />
                <Tab.Screen name="SelectGamePage" component={SelectGamePage} options={{ tabBarButton: (props) => <TabGame page='SelectGamePage' icon='home' />}} />
                <Tab.Screen name="AddServerPage" component={AddServerPage} options={{ tabBarButton: (props) => <TabComponent page='AddServerPage' icon='plus' />}} />
                <Tab.Screen name="ProfilePage" component={props.auth.isLogged === true ? UserInfosPage : ConnectPage} options={{ tabBarButton: (props) => <TabComponent page='ProfilePage' icon='user-circle' />}} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
};


// RECUP DU STORE REDUX
const mapStateToProps = ({ auth }) => ({
    auth
});

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
