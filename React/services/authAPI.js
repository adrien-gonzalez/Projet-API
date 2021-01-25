import axios from "axios";
import jwtDecode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';


/**
 * Déconnexion et supression du token de axios et du localStorage
 */
function logout() {
    SecureStore.deleteItemAsync("token");
    SecureStore.deleteItemAsync("refreshtoken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Requête HTTP d'authentification et stockage du token dans le storage et sur axios
 * @param {object} credentials 
 */
function authenticate(credentials) {
    return axios
        .post(
            "https://nicolas-camilloni.students-laplateforme.io/api/auth", credentials)
        .then(function (response) {
            // handle success
            const token = response.data.token;
            const refreshtoken = response.data.refreshtoken;
            SecureStore.setItemAsync("token", token);
            SecureStore.setItemAsync("refreshtoken", refreshtoken);
            // SecureStore.getItemAsync("token").then(result => {
            //     console.log(result);
            // });
            setAxiosToken(token);
        })
        .catch(function (error) {
            // handle error
            throw error.response.data;
        });
}

/**
 * Définie le token JWT sur axios
 * @param {string} token Le token JWT 
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
    // Voir si il y a un token ?
    SecureStore.getItemAsync("token").then(result => {
        var token = result;
        // console.log(token);
        if(token) {
            // {exp} => comme j'utilise que la propriété exp de l'objet jwtDecode, je le destructure et ne prend que exp
            const {exp} = jwtDecode(token);

            // console.log(exp, exp*1000, new Date().getTime());

            if(exp * 1000 > new Date().getTime()) {
                // Donner le token à axios
                setAxiosToken(token);
            }
        }
    });
    
    // Si le token est encore valide
    
}

export default {
    authenticate,
    logout,
    setup
}