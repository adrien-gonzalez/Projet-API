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

function deleteUser(donnees) {
  return axios({
    method: "DELETE",
    url: "https://nicolas-camilloni.students-laplateforme.io/api/users",
    data: donnees,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function updateUser(donnees) {
  return axios
    .post("https://nicolas-camilloni.students-laplateforme.io/api/users/update", donnees)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

function registerUser(donnees) {
  return axios
    .post("https://nicolas-camilloni.students-laplateforme.io/api/users", donnees)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

export default {
  checkUser,
  deleteUser,
  updateUser,
  registerUser,
};
