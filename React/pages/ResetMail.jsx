import React, {useState} from "react";
import { Dimensions } from 'react-native';
import { StyleSheet, Image, Text, View } from "react-native";
import { Formik } from 'formik';
import axios  from "axios";
import Input from "../components/input.jsx";
import Bouton from "../components/bouton.jsx";

const windowHeight = Dimensions.get('window').height;

const ResetMail = () => {

  // DEBUT AXIOS 

const handleOnSubmit = (values, actions) => {
  const donnees = new URLSearchParams();
  donnees.append("email",values.email);

  axios({
    method: "POST",
    url: "http://localhost:8080/api/resetpassword",
    data: donnees,
  })
  .then(response => {
    actions.resetForm();
    console.log(response);
  })
  .catch(error => {
    actions.resetForm();
    console.log(error.response.data.errors[0]);
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
        <Text style={styles.title}> Mot de passe oublié </Text>
      </View>
      <View>
        <Formik
          initialValues={{email: ''}}
          onSubmit={handleOnSubmit}
          >
            {(formikprops) => (
              <View style={styles.container_form}>
                <Input onChangeText={formikprops.handleChange('email')} placeholder="Adresse E-mail" value={formikprops.values.email} />
                <Bouton onPress={formikprops.handleSubmit} title="Réinitialiser le mot de passe" />
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
    // backgroundColor:"blue",
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
    left: 80,
  },
  image: {
    width: 400,
    height: 200,
    alignContent: "flex-start",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
});

export default ResetMail;
