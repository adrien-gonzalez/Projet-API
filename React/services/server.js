import axios from "axios";

function findServerByGame() {
    return axios
    .get("http://localhost:8080/api/servers?game=2")
    .then((response) => response.data)
}

export default {
    findServerByGame,
};