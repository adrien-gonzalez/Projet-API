import axios from "axios";

function checkUser(id) {
  return axios({
    method: "GET",
    url:
      "http://nicolas-camilloni.students-laplateforme.io/api/users?id="+id,
  })
    .then((response) => response.data)
    .catch((error) => error);
}

// function sendMail(donnees) {
//   return axios({
//     method: "POST",
//     url: "https://nicolas-camilloni.students-laplateforme.io/api/resetpassword",
//     data: donnees,
//   })
//     .then((response) => response.data)
//     .catch((error) => error.response.data.errors);
// }

export default {
  checkUser,
};
