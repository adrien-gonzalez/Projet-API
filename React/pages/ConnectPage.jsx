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
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import userAPI from '../services/userAPI';
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConnectPage = (props) => {

  const _updateIsLogged = (isLogged) => {
    const fetchInfosUser = async (idUser) => {
        const data = await userAPI.checkUser(idUser);
        console.log(data);
        data.map((d) => {
            const action = { type: "UPDATE_ISLOGGED", value: { isLogged: isLogged, pp: d.picture_profil} };
            props.dispatch(action);
        });
    }

    if (isLogged) {
        SecureStore.getItemAsync("token").then(result => {
            var token = result;
            fetchInfosUser(jwtDecode(token).id)
        })
    }
    else {
    const action = { type: "UPDATE_ISLOGGED", value: { isLogged: isLogged } };
    props.dispatch(action);
    // console.log(id)
    }
    
  };

  const [errors, setErrors] = useState([]);

  const navigation = useNavigation();
  const handleOnSubmit = async (values, actions) => {
    const donnees = new URLSearchParams();
    donnees.append("login", values.login);
    donnees.append("password", values.password);

    try {
      await AuthAPI.authenticate(donnees);
      _updateIsLogged(true);
      navigation.goBack();
      navigation.navigate("HomePage");
      // Updates.reloadAsync();
    } catch (error) {
      // console.log(error);
      setErrors(error);
    }

    console.log(errors);
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
          <ScrollView style={{ height: "60%" }}>
            <Formik
              initialValues={{ login: "", password: "" }}
              onSubmit={handleOnSubmit}
            >
              {(formikprops) => (
                <View style={styles.formContainer}>
                  <InputText
                    placeholder="Nom d'utilisateur"
                    icon="user-alt"
                    color="#00bcff"
                    value={formikprops.values.login}
                    onChangeText={formikprops.handleChange("login")}
                    error={errors.loginError}
                  />
                  <InputText
                    placeholder="Mot de passe"
                    type="password"
                    icon="lock"
                    color="#00bcff"
                    value={formikprops.values.password}
                    onChangeText={formikprops.handleChange("password")}
                    error={errors.passwordError}
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
                  icon="user-alt"
                  color="#00bcff"
                  value={formikprops.values.login}
                  onChangeText={formikprops.handleChange("login")}
                  error={errors.loginError}
                />
                <InputText
                  placeholder="Mot de passe"
                  type="password"
                  icon="lock"
                  color="#00bcff"
                  value={formikprops.values.password}
                  onChangeText={formikprops.handleChange("password")}
                  error={errors.passwordError}
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

const styles = StyleSheet.create({
  headerContainer: {
    height: "40%",
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
    marginBottom: 60,
  },
});

export default connect(mapDispatchToProps)(ConnectPage);
