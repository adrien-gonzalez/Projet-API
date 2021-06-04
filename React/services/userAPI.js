import axios from "axios";
import {API_URL} from "@env"

function checkUser(id) {
  return axios({
    method: "GET",
    url:
      API_URL+"users?id="+id,
  })
    .then((response) => response.data)
    .catch((error) => error);
}

function deleteUser(donnees) {
  return axios({
    method: "DELETE",
    url: API_URL+"users",
    data: donnees,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function updateUser(donnees) {
  return axios
    .post(API_URL+"users/update", donnees)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function registerUser(donnees) {
  return axios
    .post(API_URL+"users", donnees)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

export default {
  checkUser,
  deleteUser,
  updateUser,
  registerUser,
};
