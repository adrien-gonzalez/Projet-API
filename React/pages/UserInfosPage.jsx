import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import InputText from "../components/TextInput";
import { Dimensions } from "react-native";
import Bouton from "../components/bouton";
import { Formik } from "formik";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserInfosPage = () => {

  return (
    <View style={styles.connectPageContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Informations perso.</Text>
      </View>
      <ScrollView style={{ height: "60%" }}>
        <Formik
          initialValues={{ password: "", conf_password: "", email: "", login: "" }}
        >
          {(formikprops) => (
            <View style={styles.formContainer}>
              <InputText
                placeholder="Nom d'utilisateur"
                icon="user"
                color="#66A5F9"
              />
              <InputText
                placeholder="Adresse email"
                type="password"
                icon="envelope"
                color="#66A5F9"
              />
              <InputText
                placeholder="Mot de passe"
                type="password"
                icon="lock"
                color="#66A5F9"
              />
              <InputText
                placeholder="Confirmation du mot de passe"
                type="password"
                icon="lock"
                color="#66A5F9"
              />
              <Bouton title="Je m'inscris" />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  connectPageContainer: {
    minHeight: "100%",
    width: "100%",
    backgroundColor: "#F1F1F1",
  },
  formContainer: {
    paddingTop: "2%",
    width: windowWidth,
    height: "100%",
    alignItems: "center",
    paddingBottom: "14%",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#262626",
    paddingTop: windowHeight / 40,
  },
});

export default UserInfosPage;