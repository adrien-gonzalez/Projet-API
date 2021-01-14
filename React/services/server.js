import axios from "axios";

function findServerByGame() {
    return axios
    .get("https://gameservapi.000webhostapp.com/api/servers?game=2")
    .then((response) => response.data)
}

export default {
    findServerByGame,
};