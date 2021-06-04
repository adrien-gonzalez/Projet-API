import axios from "axios";
import {API_URL} from "@env"


function checkToken(token) {
  return axios({
    method: "GET",
    url:
      API_URL+"resetpassword?token="+token,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function sendMail(donnees) {
  return axios({
    method: "POST",
    url: API_URL+"resetpassword",
    data: donnees,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function resetPassword(donnees) {
  return axios({
    method: "PUT",
    url: API_URL+"resetpassword",
    data: donnees,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

export default {
  sendMail,
  resetPassword,
  checkToken,
};
