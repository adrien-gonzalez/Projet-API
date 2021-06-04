import axios from "axios";
import {API_URL} from "@env"


function findPopular() {
    return axios
    .get(API_URL+"games?popular=3")
    .then((response) => response.data)
}

function findAll() {
    return axios
    .get(API_URL+"games")
    .then((response) => response.data)
}

function findAllForCarousel() {
    return axios
    .get(API_URL+"games?carousel")
    .then((response) => response.data)
}

export default {
    findPopular,
    findAll,
    findAllForCarousel
};