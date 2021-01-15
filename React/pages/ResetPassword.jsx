import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Input from "../components/input.jsx";
import Bouton from "../components/bouton.jsx";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { Formik } from "formik";
import ResetPasswordAPI from "../services/resetPasswordAPI";

const windowHeight = Dimensions.get("window").height;

const ResetPassword = () => {
  const [response, setResponse] = useState([]);

  // DEBUT AXIOS
  const handleOnSubmit = async (values, actions) => {
    const donnees = new URLSearchParams();
    donnees.append("password", values.password);
    donnees.append("conf_password", values.conf_password);
    donnees.append("token", "858e62e8b01adeaa84a22aaed7e4bf23fe1f3b8a5d993155");
    donnees.append("id", "13");

    try {
      const data = await ResetPasswordAPI.resetPassword(donnees);
      setResponse(data);
      actions.resetForm();
    } catch (error) {
      setResponse(error);
    }
  };
  // FIN AXIOS

  console.log(response);

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
