import axios from "axios";

function findPopular() {
    return axios.get("http://localhost:8080/api/resetpassword?token=fb302f1474f82f0793913dbbd4fb2032c1c751fcd9fbb331",)
    .then((response) => response.data)
    .catch(error => {
        console.log(error);
        console.log(error.response);
      });
}


export default findPopular;