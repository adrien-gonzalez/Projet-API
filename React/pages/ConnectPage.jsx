import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import FormsHero from "../components/FormsHero";
import InputText from "../components/TextInput";
import { Dimensions } from "react-native";
import Bouton from "../components/bouton";
import { Formik } from "formik";
import axios from "axios";
import AuthAPI from "../services/authAPI";
// import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConnectPage = ({ navigation }) => {
  // const navigation = useNavigation();
  const handleOnSubmit = async (values, actions) => {
    const donnees = new URLSearchParams();
    donnees.append("login", values.login);
    donnees.append("password", values.password);

    console.log(values);

    try {
      await AuthAPI.authenticate(donnees);
      navigation.navigate("HomePage");
    } catch (error) {
      console.log(error);
    }
  };

  if (Platform.OS === "ios") {
    return (
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        keyboardVerticalOffset={0}
        behavior={"position"}
      >
        <View style={styles.connectPageContainer}>
          <View style={styles.headerContainer}>
            <FormsHero title="Connexion" />
          </View>
          <Formik
            initialValues={{ login: "", password: "" }}
            onSubmit={handleOnSubmit}
          >
            {(formikprops) => (
              <View style={styles.formContainer}>
                <InputText
                  placeholder="Nom d'utilisateur"
                  icon="user"
                  color="#00bcff"
                  value={formikprops.values.login}
                  onChangeText={formikprops.handleChange("login")}
                />
                <InputText
                  placeholder="Mot de passe"
                  type="password"
                  icon="lock"
                  color="#00bcff"
                  value={formikprops.values.password}
                  onChangeText={formikprops.handleChange("password")}
                />
                <Bouton
                  type="submit"
                  onPress={formikprops.handleSubmit}
                  title="Se connecter"
                />
                <TouchableOpacity>
                  <Text style={styles.suppCompte}>
                    Pas encore de compte ? -- S'inscrire !
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={styles.connectPageContainer}>
        <View style={styles.headerContainer}>
          <FormsHero title="Connexion" />
        </View>
        <ScrollView style={{ height: "60%" }}>
          <Formik
            initialValues={{ login: "", password: "" }}
            onSubmit={handleOnSubmit}
          >
            {(formikprops) => (
              <View style={styles.formContainer}>
                <InputText
                  placeholder="Nom d'utilisateur"
                  icon="user"
                  color="#00bcff"
                  value={formikprops.values.login}
                  onChangeText={formikprops.handleChange("login")}
                />
                <InputText
                  placeholder="Mot de passe"
                  type="password"
                  icon="lock"
                  color="#00bcff"
                  value={formikprops.values.password}
                  onChangeText={formikprops.handleChange("password")}
                />
                <Bouton
                  type="submit"
                  onPress={formikprops.handleSubmit}
                  title="Se connecter"
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProfilePage", {
                      screen: "RegisterPage",
                    });
                  }}
                >
                  <Text style={styles.register}>
                    Pas encore de compte ? -- Je m'inscris !
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProfilePage", {
                      screen: "ResetMailPage",
                    });
                  }}
                >
                  <Text style={styles.forgotPassword}>
                    Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    height: "40%",
    // backgroundColor: 'red',
  },
  connectPageContainer: {
    minHeight: "100%",
    width: "100%",
    backgroundColor: "#F1F1F1",
  },
  formContainer: {
    paddingTop: "8%",
    width: windowWidth,
    height: "100%",
    alignItems: "center",
  },
  register: {
    color: "#00bcff",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 20,
  },
  forgotPassword: {
    color: "red",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 10,
    marginBottom:60,
  },
});

export default ConnectPage;
