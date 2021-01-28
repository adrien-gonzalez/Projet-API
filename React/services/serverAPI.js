import axios from "axios";


// All servers informations by game
function findServerByGame(id) {
    return axios
    .get("http://nicolas-camilloni.students-laplateforme.io/api/servers?game="+id)
    .then((response) => response.data)
}

// Informations server by id
function findServerByID(id) {
    return axios
    .get("http://nicolas-camilloni.students-laplateforme.io/api/servers?id="+id)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// Informations server by user
function findServerByUser(user) {
    return axios
    .get("http://nicolas-camilloni.students-laplateforme.io/api/servers?user="+user)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// Write a comment
function postComment(donnees) {
    return axios
    .post("http://nicolas-camilloni.students-laplateforme.io/api/comment", donnees)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

// Create server
function createServer(formData) {
    return axios.post(
        'http://nicolas-camilloni.students-laplateforme.io/api/servers', formData)
        .then((response) => response)
        .catch((error) => error.response.data.errors);
}

// Update server
function updateServer(formData, id) {
    return axios.post(
        'http://nicolas-camilloni.students-laplateforme.io/api/servers/update?id='+id, 
        formData)
        .then((response) => response)
        .catch((error) => error.response.data.errors);
}

// Delete Server
function deleteServer(donnees, id) {
    return axios({
        method: "DELETE",
        url: 'http://nicolas-camilloni.students-laplateforme.io/api/servers?id='+id,
        data: donnees,
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
};