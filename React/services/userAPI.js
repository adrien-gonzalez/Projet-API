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

function deleteUser(id,donnees) {
  return axios({
    method: "DELETE",
    url: "https://nicolas-camilloni.students-laplateforme.io/api/users?id="+id,
    data: donnees,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}

export default {
  checkUser,
  deleteUser,
};
