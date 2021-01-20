import React, { useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { Formik } from "formik";
import Input from "../components/input.jsx";
import Bouton from "../components/bouton.jsx";
import ResetPasswordAPI from "../services/resetPasswordAPI";

const windowHeight = Dimensions.get("window").height;

const ResetMail = () => {
  const [response, setResponse] = useState();

  // DEBUT AXIOS
  const handleOnSubmit = async (values, actions) => {
    const donnees = new URLSearchParams();
    donnees.append("email", values.email);

    try {
      const data = await ResetPasswordAPI.sendMail(donnees);
      if (typeof data == "object") {
        data.map((d) => {
          setResponse(d.email_error);
        });
      } else {
        setResponse(data);
        actions.resetForm();
      }
    } catch (error) {
      setResponse(error);
    }
  };
  // FIN AXIOS

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container_top}>
          <Image
            style={styles.image}
            source={require("../assets/updates-catspandas_latest.jpg")}
          />
          <Text style={styles.title}> Mot de passe oublié </Text>
        </View>
        <View>
          <Formik initialValues={{ email: "" }} onSubmit={handleOnSubmit}>
            {(formikprops) => (
              <View style={styles.container_form}>
                <View style={styles.container_input}>
                  <Input
                    onChangeText={formikprops.handleChange("email")}
                    placeholder="Adresse E-mail"
                    value={formikprops.values.email}
                  />
                  <Text style={styles.errors}>{response}</Text>
                </View>
                <Bouton
                  onPress={formikprops.handleSubmit}
                  title="Réinitialiser le mot de passe"
                />
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
    height: "100%",
    backgroundColor: "#F1F1F1",
  },
  container_top: {
    minHeight: windowHeight / 4,
    alignItems: "center",
  },
  container_form: {
    minHeight: windowHeight / 2,
    alignItems: "center",
    justifyContent: "space-evenly",
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
