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
import axios from "axios";


const Tab = createBottomTabNavigator();

const Main = (props) => {

    // VVVVVVVV POUR FAIRE DES TEST VVVVVVVV
    // SecureStore.deleteItemAsync("token");
    // SecureStore.deleteItemAsync("refreshtoken");
    // delete axios.defaults.headers["Authorization"];

    // SecureStore.getItemAsync("refreshtoken").then(result => {
    //     var token = result;
    // })
    // SecureStore.getItemAsync("token").then(result => {
    //     var token = result;
    // })
    // axios.interceptors.request.use(request => {
    //     console.log('Starting Request', JSON.stringify(request, null, 2))
    //     return request
    // })



    // INTERCEPTEUR AXIOS POUR VERIF SI TOKEN EXPIRE ET SI OUI REFRESH

    axios.interceptors.response.use(
        function(response) {
          // If the request succeeds, we don't have to do anything and just return the response
          return response
        },
        function(error) {
          const errorResponse = error.response
          if (isTokenExpiredError(errorResponse)) {
            return resetTokenAndReattemptRequest(error)
          }
          // If the error is due to other reasons, we just throw it back to axios
          return Promise.reject(error)
        }
    )
    function isTokenExpiredError(errorResponse) {
        if (errorResponse.data.message == "Token invalide" && errorResponse.status == 401) {
            return true;
        } else return false;
    }

    let isAlreadyFetchingAccessToken = false;

    // This is the list of waiting requests that will retry after the JWT refresh complete
    let subscribers = [];

    async function resetTokenAndReattemptRequest(error) {
        try {
            const { response: errorResponse } = error;
            const resetToken = await SecureStore.getItemAsync("refreshtoken"); // Your own mechanism to get the refresh token to refresh the JWT token
            if (!resetToken) {
                // We can't refresh, throw the error anyway
                return Promise.reject(error);
            }
            /* Proceed to the token refresh procedure
            We create a new Promise that will retry the request,
            clone all the request configuration from the failed
            request in the error object. */
            const retryOriginalRequest = new Promise(resolve => {
                /* We need to add the request retry to the queue
                since there another request that already attempt to
                refresh the token */
                addSubscriber(access_token => {
                    errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
                    axios.defaults.headers["Authorization"] = "Bearer " + access_token;
                    console.log("ici", errorResponse.config)
                    resolve(axios(errorResponse.config));
                });
            });
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;
                const donnees = new URLSearchParams();
                donnees.append('refresh', resetToken);
                const response = await axios({
                    method: 'post',
                    url: `https://nicolas-camilloni.students-laplateforme.io/api/refresh`,
                    data: donnees
                });
                if (!response.data) {
                    return Promise.reject(error);
                }
                SecureStore.setItemAsync("token", response.data.token);
                SecureStore.setItemAsync("refreshtoken", response.data.refresh);
                isAlreadyFetchingAccessToken = false;
                onAccessTokenFetched(response.data.token);
            }
            return retryOriginalRequest;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    function onAccessTokenFetched(access_token) {
        // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
    }

    function addSubscriber(callback) {
    subscribers.push(callback);
    }

    // FIN INTERCEPTEUR



    // ACTION POUR UPDATE LE STATE ISLOGGED DU STORE REDUX

    const _updateIsLogged = (isLogged) => {
        const action = { type: "UPDATE_ISLOGGED", value: {isLogged: isLogged} }
        props.dispatch(action)
        // console.log(id)
    }


    // // CHECK SI L'UTILISATEUR EST CO AU CHARGEMENT DE L'APP

    const checkLoginState = async () => {
        // retrieve the value of the token
        const tokenstored = await SecureStore.getItemAsync("token")
        // console.log("--------------"+tokenstored+"---------------");

            if(tokenstored !== null ) {
                // console.log("--------------0-----------");
                const {exp} = jwtDecode(tokenstored);
        
        
                // Si le token dans le securestorage est pas expiré
                if(exp * 1000 > new Date().getTime()) {
                    // console.log("--------------1-----------");
                    if (props.auth.isLogged != true) _updateIsLogged(true);
                }
                else {
                    if (props.auth.isLogged == false) {
                        // console.log("--------------2---------------");
                        const resetToken = await SecureStore.getItemAsync("refreshtoken"); // Your own mechanism to get the refresh token to refresh the JWT token
                        
                        // Si pas de token dans securestorage
                        if (!resetToken) {
                            // console.log("--------------3---------------");
                            // We can't refresh, throw the error anyway
                            SecureStore.deleteItemAsync("token");
                            SecureStore.deleteItemAsync("refreshtoken");
                            delete axios.defaults.headers["Authorization"];
                            _updateIsLogged(false);
                        }
                        else {
                            // console.log("--------------4---------------");
                            const donnees = new URLSearchParams();
                            donnees.append('refresh', resetToken);
                            const response = await axios({
                                method: 'post',
                                url: `https://nicolas-camilloni.students-laplateforme.io/api/refresh`,
                                data: donnees
                            });

                            // Si refresh marche pas (token refresh invalide)
                            if (!response.data) {
                                // console.log("--------------5---------------");
                                SecureStore.deleteItemAsync("token");
                                SecureStore.deleteItemAsync("refreshtoken");
                                delete axios.defaults.headers["Authorization"];
                                _updateIsLogged(false);
                                return Promise.reject(error);
                            }
                            else {
                                // console.log("--------------6---------------");
                                console.log(response.data);
                                SecureStore.setItemAsync("token", response.data.token);
                                SecureStore.setItemAsync("refreshtoken", response.data.refresh);
                                axios.defaults.headers["Authorization"] = "Bearer " + response.data.token;
                                _updateIsLogged(true);
                            }
                        }
                    }
                }
            }
            else {
                // Si isLogged == true et pas de token dans localstorage ===> set isLogged = false
                if (props.auth.isLogged != false) _updateIsLogged(false);
            }
    }
  
    useEffect(() => {
        checkLoginState();
    });

    // FIN DU CHECK

    
    AuthAPI.setup(); // SETUP DE L'APPLI


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

};


// RECUP DU STORE REDUX
const mapStateToProps = ({ auth }) => ({
    auth
});

// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
