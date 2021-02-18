import React, { useState } from "react";
import { Dimensions } from "react-native";
import InputText from "../components/TextInput.jsx";
import Bouton from "../components/bouton.jsx";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Formik } from "formik";
import ResetPasswordAPI from "../services/resetPasswordAPI";
import FormsHero from "../components/FormsHero";
import { connect } from 'react-redux';

const windowWidth = Dimensions.get("window").width;

const ResetPassword = (props) => {

  const navigation = props.navigation;

  const [response, setResponse] = useState([]);
  const [errorToken, setErrorToken] = useState([]);
  const [errorPassword, setErrorPassword] = useState([]);
  const [errorConfPassword, setErrorConfPassword] = useState([]);
  const [errorResetToken, setErrorResetToken] = useState([]);

  // DEBUT AXIOS PUT
  const handleOnSubmit = async (values, actions) => {
    // Variable pour l'AXIOS GET
    const token = values.token;

    // Variable pour l'AXIOS PUT
    const donnees = new URLSearchParams();
    donnees.append("password", values.password);
    donnees.append("conf_password", values.conf_password);

    // AXIOS GET
    try {
      const data = await ResetPasswordAPI.checkToken(token);
      data.map((d) => {
        donnees.append("id", d.id);
      });
      if (data) {
        // AXIOS PUT
        try {
          const data = await ResetPasswordAPI.resetPassword(donnees);
          console.log(donnees);
          if (typeof data == "object") {
            data.map((d) => {
              if (
                d.reset_token_error ||
                d.token_error ||
                d.password_error ||
                d.conf_password_error
              ) {
                setErrorResetToken(d.reset_token_error);
                setErrorToken(d.token_error);
                setErrorPassword(d.password_error);
                setErrorConfPassword(d.conf_password_error);
              }
            });
          } else {
            setResponse(data);
            if (response == "") {
              setErrorToken("");
              setErrorPassword("");
              setErrorConfPassword("");

              actions.resetForm();
              navigation.navigate("ProfilePage", {
                screen: "ConnectPage",
              });
            }
          }
        } catch (error) {
          setResponse(error);
        }
      }
    } catch (error) {
      setResponse(error);
    }
  };

  return (
    <View style={{
      minHeight: '100%',
      width: '100%',
      backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
    }}>
      <View style={styles.headerContainer}>
        <FormsHero title="Mot de passe oublié" navigation={navigation} needBar={true} />
      </View>
      <ScrollView style={{ height: "60%" }}>
        <Formik
          initialValues={{ password: "", conf_password: "", token: "" }}
          onSubmit={handleOnSubmit}
        >
          {(formikprops) => (
            <View style={styles.formContainer}>
              <Text style={styles.success}>Un mail vous a été envoyé, si ce n'est pas le cas veuillez réessayer !</Text>
              <View style={styles.container_input}>
                <InputText
                  onChangeText={formikprops.handleChange("password")}
                  value={formikprops.values.password}
                  type="password"
                  placeholder="Mot de passe"
                  icon="lock"
                  color="#66A5F9"
                  error={errorPassword}
                />
              </View>
              <View style={styles.container_input}>
                <InputText
                  onChangeText={formikprops.handleChange("conf_password")}
                  value={formikprops.values.conf_password}
                  type="password"
                  placeholder="Confirmation de mot de passe"
                  icon="lock"
                  color="#66A5F9"
                  error={errorConfPassword}
                />
              </View>
              <View style={styles.container_input}>
                <InputText
                  onChangeText={formikprops.handleChange("token")}
                  value={formikprops.values.token}
                  placeholder="Token"
                  icon="lock"
                  color="#66A5F9"
                  error={errorResetToken}
                />
              </View>
              <Bouton
                type="submit"
                onPress={formikprops.handleSubmit}
                title="Modifier"
                />
              <Text style={styles.errors}>{errorToken}</Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

// RECUP DU STORE REDUX
const mapStateToProps = ({ apparence }) => ({
  apparence,
});

export default connect(mapStateToProps)(ResetPassword);

const styles = StyleSheet.create({
  headerContainer: {
    height: "40%",
  },
  formContainer: {
    paddingTop: "2%",
    width: windowWidth,
    height: "100%",
    alignItems: "center",
    paddingBottom: "14%",
  },
  container_input: {
    alignItems: "center",
    width: "100%",
  },
  success: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    paddingBottom:20,
  },
});

