import axios from "axios";

function checkToken(token) {
  return axios({
    method: "GET",
    url:
      "https://nicolas-camilloni.students-laplateforme.io/api/resetpassword?token="+token,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function sendMail(donnees) {
  return axios({
    method: "POST",
    url: "https://nicolas-camilloni.students-laplateforme.io/api/resetpassword",
    data: donnees,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function resetPassword(donnees) {
  return axios({
    method: "PUT",
    url: "https://nicolas-camilloni.students-laplateforme.io/api/resetpassword",
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
