import axios from "axios";

function findPopular() {
    return axios
    .get("https://nicolas-camilloni.students-laplateforme.io/api/games?popular=3")
    .then((response) => response.data)
}

function findAll() {
    return axios
    .get("https://nicolas-camilloni.students-laplateforme.io/api/games")
    .then((response) => response.data)
}

export default {
    findPopular,
    findAll,
};