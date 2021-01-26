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
import axios from "axios";


const Tab = createBottomTabNavigator();

const Main = (props) => {

    axios.interceptors.response.use(
        function(response) {
          // If the request succeeds, we don't have to do anything and just return the response
          return response
        },
        function(error) {
          const errorResponse = error.response
        //   console.log(errorResponse);
        console.log('====================================');
        console.log(errorResponse.data.message, errorResponse.status);
        console.log(errorResponse.data.message == "Token invalide" && errorResponse.status == 401);
        console.log('===================================='); 
          if (isTokenExpiredError(errorResponse)) {
            console.log("ok4");
            return resetTokenAndReattemptRequest(error)
          }
        //   console.log(Promise.reject(error.response));
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
            // var refreshtoken = SecureStore.getItemAsync("token").then(result => {
            //     console.log(result);
            // });
            const resetToken = await SecureStore.getItemAsync("refreshtoken"); // Your own mechanism to get the refresh token to refresh the JWT token
            if (!resetToken) {
                // We can't refresh, throw the error anyway
                return Promise.reject(error);
            }
            console.log("testing");
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
                console.log("testing4");
                isAlreadyFetchingAccessToken = true;
                console.log(resetToken);
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
                console.log(response.data);
                SecureStore.setItemAsync("token", response.data.token);
                SecureStore.setItemAsync("refreshtoken", response.data.refresh);
                // setAxiosToken(response.data.token); // MODIF ICI
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



    // SecureStore.deleteItemAsync("token");
    // SecureStore.deleteItemAsync("refreshtoken");
    // delete axios.defaults.headers["Authorization"];
    // SecureStore.setItemAsync("token", "salut");
    // axios.defaults.headers["Authorization"] = "Bearer " + "salut";
    // SecureStore.setItemAsync("refreshtoken", "yoooo");


    // const handleRefresh = async (donnees) => {
    //     try {
    //         await AuthAPI.refresh(donnees);
    //         // _updateIsLogged(true);
    //         // navigation.navigate("HomePage");
    //         // Updates.reloadAsync();
    //     } catch (error) {
    //         // console.log(error);
    //     }
    // }



    // axios.interceptors.response.use(res => {
    //     // console.log(res.request._header)
    //     return res;
    //   }, error => Promise.reject(error));
    // const test = async () => await SecureStore.getItemAsync("token").then(result => {
    //     if(result !== null ) {
    //         // console.log(result);
    //         const donnees = new URLSearchParams();
    //         donnees.append('refresh', result);
    //         handleRefresh(donnees)
    //     }
    //     else {
    //         console.log("refreshtoken vide");
    //     }
    // })



    // const getRefresh = async () => await SecureStore.getItemAsync("refreshtoken").then(result => {
    //     if(result !== null ) {
    //         // console.log(result);
    //         const donnees = new URLSearchParams();
    //         donnees.append('refresh', result);
    //         handleRefresh(donnees)
    //     }
    //     else {
    //         console.log("refreshtoken vide");
    //     }
    // })




    // axios.defaults.headers["Authorization"] = "Bearer salut";




    // axios.interceptors.request.use(request => {
    //     console.log('Starting Request', JSON.stringify(request, null, 2))
    //     return request
    //   })
      




    // axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    //     if ((err.response.status === 401 || err.response.data.message === "Token invalide") && err.response.data.message != "Token faux") {
    //         // console.log(err.response.data.message);
    //         console.log("lolo");
    //         getRefresh();
    //     }
    //     else if (err.repsonse.data.message === "Token faux") {
    //         console.log("stop");
    //     }
    //     return Promise.reject(err);
    // })




    // axios.interceptors.response.use(function (response) {
    //     // Any status code that lie within the range of 2xx cause this function to trigger
    //     // Do something with response data
    //     console.log("okok");
    //     // return response;
    //   }, function (error) {
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    //     // console.log(error);
    //     console.log(error.response);
    //     // return Promise.reject(error);
    //   });






    const _updateIsLogged = (isLogged) => {
        const action = { type: "UPDATE_ISLOGGED", value: {isLogged: isLogged} }
        props.dispatch(action)
        // console.log(id)
    }

    // // CHECK SI L'UTILISATEUR EST CO
    // const checkLoginState = async () => {
    //     // retrieve the value of the token
    //     await SecureStore.getItemAsync("token").then(result => {
    //         if(result !== null ) {
    //             // {exp} => comme j'utilise que la propriété exp de l'objet jwtDecode, je le destructure et ne prend que exp
    //             const {exp} = jwtDecode(result);
        
    //             // console.log(exp, exp*1000, new Date().getTime());
        
    //             if(exp * 1000 > new Date().getTime()) {
    //                 if (props.auth.isLogged != true) _updateIsLogged(true);
    //             }
    //             else {
    //                 if (props.auth.isLogged != false) _updateIsLogged(false);
    //             }
    //         }
    //         else {
    //             if (props.auth.isLogged != false) _updateIsLogged(false);
    //         }
    //     })
    // }
  
    // call checkLoginState as soon as the component mounts
    useEffect(() => {
        // let mounted = true;
        // // checkLoginState();
        // SecureStore.getItemAsync("token").then(result => {
        //     if (mounted) {
        //         if(result !== null ) {
        //             // {exp} => comme j'utilise que la propriété exp de l'objet jwtDecode, je le destructure et ne prend que exp
        //             const {exp} = jwtDecode(result);
            
        //             // console.log(exp, exp*1000, new Date().getTime());
            
        //             if(exp * 1000 > new Date().getTime()) {
        //                 if (props.auth.isLogged != true) _updateIsLogged(true);
        //             }
        //             else {
        //                 if (props.auth.isLogged != false) _updateIsLogged(false);
        //             }
        //         }
        //         else {
        //             if (props.auth.isLogged != false) _updateIsLogged(false);
        //         }
        //     }
        // })

        // return () => mounted = false;
        // // console.log(props);
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
        AuthAPI.setup();
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
