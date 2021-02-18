import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import FormsHero from "../components/FormsHero";
import InputText from "../components/TextInput";
import Bouton from "../components/bouton";
import { Formik } from "formik";
import userAPI from "../services/userAPI.js";
import { connect } from 'react-redux';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RegisterPage = (props) => {
  const navigation = props.navigation;

  const [loginError, setLoginError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [PasswordError, setPasswordError] = useState([]);
  const [cPasswordError, setcPasswordError] = useState([]);
  const [response, setResponse] = useState([]);

  const handleOnSubmit = async (values, actions) => {
    // On set les messages d'erreur à null
    setLoginError("");
    setEmailError("");
    setPasswordError("");
    setcPasswordError("");

    const donnees = new URLSearchParams();
    donnees.append("login", values.login);
    donnees.append("email", values.email);
    donnees.append("password", values.password);
    donnees.append("cpassword", values.cpassword);

    try {
      const data = await userAPI.registerUser(donnees);
      if (typeof data == "object") {
        // console.log(data);
        data.map((d) => {
          if (d.loginExist) {
            setLoginError(d.loginExist);
          }
          if (d.invalidEmail) {
            setEmailError(d.invalidEmail);
          }
          if (d.invalidPassword) {
            setPasswordError(d.invalidPassword);
          }
          if (d.loginEmpty) {
            setLoginError(d.loginEmpty);
          }
          if (d.emailEmpty) {
            setEmailError(d.emailEmpty);
          }
          if (d.passwordEmpty) {
            setPasswordError(d.passwordEmpty);
          }
          if (d.cpasswordEmpty) {
            setcPasswordError(d.cpasswordEmpty);
          }
          if (d.emailExist) {
            setEmailError(d.emailExist);
          }
          if (d.invalidLogin) {
            setLoginError(d.invalidLogin);
          }
          if (d.passwordAndConfirmNotMatch) {
            setcPasswordError(d.passwordAndConfirmNotMatch);
          }
        });
      } else {
        navigation.goBack();
        navigation.navigate("ProfilePage", {
          screen: "ConnectPage",
        });
      }
    } catch (error) {
      setResponse(error);
    }
  };

  if (Platform.OS === "ios") {
    return (
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        keyboardVerticalOffset={0}
        behavior={"position"}
      >
        <View style={{
          minHeight: '100%',
          width: '100%',
          backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
        }}>
          <View style={styles.headerContainer}>
            <FormsHero navigation={navigation} title="Inscription" needBar={true} />
          </View>
          <ScrollView style={{ height: "60%" }}>
            <Formik
              enableReinitialize
              initialValues={{
                email: "",
                login: "",
                password: "",
                cpassword: "",
              }}
              onSubmit={handleOnSubmit}
            >
              {(formikprops) => (
                <View style={styles.formContainer}>
                  <InputText
                    placeholder="Nom d'utilisateur"
                    icon="user"
                    color="#66A5F9"
                    value={formikprops.values.login}
                    onChangeText={formikprops.handleChange("login")}
                    error={loginError}
                  />
                  <InputText
                    placeholder="Adresse email"
                    icon="envelope"
                    color="#66A5F9"
                    value={formikprops.values.email}
                    onChangeText={formikprops.handleChange("email")}
                    error={emailError}
                  />
                  <InputText
                    placeholder="Mot de passe"
                    type="password"
                    icon="lock"
                    color="#66A5F9"
                    value={formikprops.values.password}
                    onChangeText={formikprops.handleChange("password")}
                    error={PasswordError}
                  />
                  <InputText
                    placeholder="Confirmation du mot de passe"
                    type="password"
                    icon="lock"
                    color="#66A5F9"
                    value={formikprops.values.cpassword}
                    onChangeText={formikprops.handleChange("cpassword")}
                    error={cPasswordError}
                  />
                  <Bouton
                    type="submit"
                    onPress={formikprops.handleSubmit}
                    title="Je m'inscris"
                  />
                  <Text>{response}</Text>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={{
        minHeight: '100%',
        width: '100%',
        backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
      }}>
        <View style={styles.headerContainer}>
          <FormsHero navigation={navigation} title="Inscription" needBar={true} />
        </View>
        <ScrollView style={{ height: "60%" }}>
          <Formik
            enableReinitialize
            initialValues={{
              email: "",
              login: "",
              password: "",
              cpassword: "",
            }}
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
                  error={loginError}
                />
                <InputText
                  placeholder="Adresse email"
                  icon="envelope"
                  color="#00bcff"
                  value={formikprops.values.email}
                  onChangeText={formikprops.handleChange("email")}
                  error={emailError}
                />
                <InputText
                  placeholder="Mot de passe"
                  type="password"
                  icon="lock"
                  color="#00bcff"
                  value={formikprops.values.password}
                  onChangeText={formikprops.handleChange("password")}
                  error={PasswordError}
                />
                <InputText
                  placeholder="Confirmation du mot de passe"
                  type="password"
                  icon="lock"
                  color="#00bcff"
                  value={formikprops.values.cpassword}
                  onChangeText={formikprops.handleChange("cpassword")}
                  error={cPasswordError}
                />
                <Bouton
                  type="submit"
                  onPress={formikprops.handleSubmit}
                  title="Je m'inscris"
                />
                <Text>{response}</Text>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }
};

const mapStateToProps = ({ apparence }) => ({
  apparence,
});

export default connect(mapStateToProps)(RegisterPage);

const styles = StyleSheet.create({
  headerContainer: {
    height: "40%",
    // backgroundColor: 'red',
  },
  formContainer: {
    paddingTop: "2%",
    width: windowWidth,
    height: "100%",
    alignItems: "center",
    paddingBottom: "14%",
  },
});

