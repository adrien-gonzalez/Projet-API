import axios from "axios";

function findPopular() {
    return axios
    .get("https://gameservapi.000webhostapp.com/api/games?popular=3")
    .then((response) => response.data)
}

function findAll() {
    return axios
    .get("https://gameservapi.000webhostapp.com/api/games")
    .then((response) => response.data)
}

export default {
    findPopular,
    findAll,
};