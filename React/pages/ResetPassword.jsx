import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Input from "../components/input.jsx";
import Bouton from "../components/bouton.jsx";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { Formik } from "formik";
import ResetPasswordAPI from "../services/resetPasswordAPI";

const windowHeight = Dimensions.get("window").height;

const ResetPassword = ({navigation}) => {
  const [response, setResponse] = useState([]);
  const [errorToken, setErrorToken] = useState([]);
  const [errorPassword, setErrorPassword] = useState([]);
  const [errorConfPassword, setErrorConfPassword] = useState([]);
  const [errorResetToken, setErrorResetToken] = useState([]);

  // DEBUT AXIOS PUT
  const handleOnSubmit = async (values, actions) => {
    // Variable pour l'AXIOS PUT
    const donnees = new URLSearchParams();
    donnees.append("password", values.password);
    donnees.append("conf_password", values.conf_password);
    donnees.append("token", values.token);
    donnees.append("id","11"); // A supprimer lorsque l'API sera modifiée
    // Variable pour l'AXIOS GET
    const token = values.token;

    // AXIOS GET puis si GET OK PUT
    try {
      const data = await ResetPasswordAPI.checkToken(token, donnees);
      if (typeof data == "object") {
        data.map((d) => {
          if (d.reset_token_error ||d.token_error ||d.password_error ||d.conf_password_error) 
          {
            setErrorResetToken(d.reset_token_error);
            setErrorToken(d.token_error);
            setErrorPassword(d.password_error);
            setErrorConfPassword(d.conf_password_error);
          }
        })
      } else {
        setResponse(data);
        if (response == "") {
          setErrorToken("");
          setErrorPassword("");
          setErrorConfPassword("");
          actions.resetForm();
          navigation.navigate('ProfilePage')
        }
      }
    } catch (error) {
      setResponse(error);
    }

  };

  return (
    <ScrollView>
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
            initialValues={{ password: "", conf_password: "", token: "" }}
            onSubmit={handleOnSubmit}
          >
            {(formikprops) => (
              <View style={styles.container_form}>
                <View style={styles.container_input}>
                  <Input
                    onChangeText={formikprops.handleChange("password")}
                    placeholder="Nouveau mot de passe"
                    value={formikprops.values.password}
                  />
                  <Text style={styles.errors}>{errorPassword}</Text>
                </View>
                <View style={styles.container_input}>
                  <Input
                    onChangeText={formikprops.handleChange("conf_password")}
                    placeholder="Confirmation du mot de passe"
                    value={formikprops.values.conf_password}
                  />
                  <Text style={styles.errors}>{errorConfPassword}</Text>
                </View>
                <View style={styles.container_input}>
                  <Input
                    onChangeText={formikprops.handleChange("token")}
                    placeholder="Token"
                    value={formikprops.values.token}
                  />
                  <Text style={styles.errors}>{errorResetToken}</Text>
                </View>
                <Bouton onPress={formikprops.handleSubmit} title="Modifier" />
                <Text style={styles.errors}>{errorToken}</Text>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: windowHeight,
    backgroundColor: "#F1F1F1",
  },
  container_top: {
    alignItems: "center",
    minHeight: windowHeight / 4,
  },
  container_form: {
    alignItems: "center",
    minHeight: windowHeight / 2,
    justifyContent: "space-evenly",
    marginTop: windowHeight / 20,
  },
  container_input: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
  },
  errors: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
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
    left: 90,
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
