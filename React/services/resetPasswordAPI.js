import axios from "axios";

function sendMail(donnees) {
  return axios({
    method: "POST",
    url: "https://nicolas-camilloni.students-laplateforme.io/api/resetpassword",
    data: donnees,
  })
    .then((response) => response.data)
    .catch(error => error.response.data.errors);
}

function resetPassword(donnees) {
    return axios({
        method: "PUT",
        url: "https://nicolas-camilloni.students-laplateforme.io/api/resetpassword",
        data: donnees,
    })
      .then(response => response.data)
      .catch(error => error.response.data.errors);
}

export default {
  sendMail,
  resetPassword
};
