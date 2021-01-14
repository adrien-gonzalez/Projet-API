// import React from "react";
// import { Text, View } from "react-native";
// import axios from "axios";

// export default class reset extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//     };
//   }
//   componentDidMount() {
//     this.getapiData();
//   }
//   async getapiData() {
//     const donnes = new URLSearchParams();
//     donnes.append("login", "buste=r46");
//     donnes.append("password", "Password21");

//     const resp = await axios.post("http://localhost:8080/api/auth", donnes);
//     this.setState({ data: resp.data });
//     console.log(this.state.data);
//   }
//   render() {
//     return (
//       <View>
//         <Text>{this.state.data.token}</Text>
//       </View>
//     );
//   }
// }
