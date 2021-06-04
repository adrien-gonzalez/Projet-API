import axios from "axios";
import {API_URL} from "@env"

// All servers informations by game
function findServerByGame(id) {
    console.log('axios',id);
    return axios
    .get(API_URL+"servers?game="+id)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

// Informations server by id
function findServerByID(id) {
    return axios
    .get(API_URL+"servers?id="+id)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// Informations server by user
function findServerByUser(user) {
    return axios
    .get(API_URL+"servers?user="+user)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// Write a comment
function postComment(donnees) {
    return axios
    .post(API_URL+"comment", donnees)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

// Create server
function createServer(formData) {
    return axios.post(
        API_URL+'servers', formData)
        .then((response) => response.data)
        .catch((error) => error.response.data.errors);
}

// Update server
function updateServer(formData, id) {
    return axios.post(
        API_URL+'servers/update?id='+id, 
        formData)
        .then((response) => response.data)
        .catch((error) => error.response.data.errors);
}

// Delete Server
function deleteServer(donnees, id) {
    return axios({
        method: "DELETE",
        url: API_URL+'servers?id='+id,
        data: donnees,
    })
        .then((response) => response.data)
        .catch((error) => error.response.data.errors);
}

// Delete Server
function deleteComment(id) {
    return axios({
        method: "DELETE",
        url: API_URL+'comment?id='+id,
    })
        .then((response) => response.data)
        .catch((error) => error.response.data.errors);
}

export default {
    findServerByGame,
    findServerByID,
    postComment,
    createServer,
    updateServer,
    findServerByUser,
    deleteServer,
    deleteComment,
};