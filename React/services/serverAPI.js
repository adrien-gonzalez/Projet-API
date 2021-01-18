import axios from "axios";


// All servers informations by game
function findServerByGame() {
    return axios
    .get("http://nicolas-camilloni.students-laplateforme.io/api/servers?game=1")
    .then((response) => response.data)
}

// Informations server by id
function findServerByID() {
    return axios
    .get("http://nicolas-camilloni.students-laplateforme.io/api/servers?id=4")
    .then((response) => response.data)
}

// Ecrire un commentaire 
function postComment() {
    return axios
    .post("http://nicolas-camilloni.students-laplateforme.io/api/comment")
    .then((response) => response.data)
}

export default {
    findServerByGame,
    findServerByID,
    postComment,
};