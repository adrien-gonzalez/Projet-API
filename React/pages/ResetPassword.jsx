import React, {useState, useEffect} from "react";
import { Dimensions } from "react-native";
import Input from "../components/input.jsx";
import Bouton from "../components/bouton.jsx";
import { StyleSheet, Image, Text, View } from "react-native";
import { Formik } from "formik";
import axios from "axios";

const windowHeight = Dimensions.get("window").height;

const ResetPassword = () => {

// DEBUT AXIOS 

const handleOnSubmit = (values, actions) => {
  const donnees = new URLSearchParams();
  donnees.append("password",values.password);
  donnees.append("conf_password",values.conf_password);
  donnees.append("token","310e04e4ebcb1680f8ce7a41da2c27e31864e72e985e14fb");
  donnees.append("id","14");

  axios({
    method: "PUT",
    url: "http://localhost:8080/api/resetpassword",
    data: donnees,
  })
  .then(response => {
    actions.resetForm();
    console.log(response);
  })
  .catch(error => {
    console.log(error);
    
  });
};

// FIN AXIOS

  return (
    <View style={styles.container}>
      <View style={styles.container_top}>
        <Image
          style={styles.image}
          source={require("../assets/updates-catspandas_latest.jpg")}
        />
        <Text style={styles.title}> Réinitialisation du mot de passe</Text>
      </View>
      <View>
        <Formik
          initialValues={{ password: "", conf_password: "" }}
          onSubmit={handleOnSubmit}
        >
          {(formikprops) => (
            <View style={styles.container_form}>
              <Input
                onChangeText={formikprops.handleChange("password")}
                placeholder="Nouveau mot de passe"
                value={formikprops.values.password}
              />
              <Input
                onChangeText={formikprops.handleChange("conf_password")}
                placeholder="Confirmation du mot de passe"
                value={formikprops.values.conf_password}
              />
              <Bouton onPress={formikprops.handleSubmit} title="Modifier" />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    minHeight: windowHeight,
    backgroundColor:"#F1F1F1",
  },
  container_top: {
    flex: 0.1,
    alignItems: "center",
  },
  container_form: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: windowHeight / 20,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    textShadowColor: "#000000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    color: "#FEFEFE",
    position: "absolute",
    top: 180,
    left: 110,
    width: 180,
  },
  image: {
    width: 400,
    height: 200,
    alignContent: "flex-start",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
});

export default ResetPassword;
