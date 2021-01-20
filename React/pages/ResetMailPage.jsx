import React, { useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { Formik } from "formik";
import InputText from "../components/TextInput.jsx";
import FormsHero from '../components/FormsHero';
import Bouton from "../components/bouton.jsx";
import ResetPasswordAPI from "../services/resetPasswordAPI";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ResetMail = ({navigation}) => {
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
        navigation.navigate("ProfilePage", {
          screen: "ResetPasswordPage",
        });
        // navigation.navigate('ResetPasswordPage');
      }
    } catch (error) {
      setResponse(error);
    }
  };
  // FIN AXIOS

  return (
      <View style={styles.resetPageContainer}>
        <View style={styles.headerContainer}>
          <FormsHero title="Mot de passe oublié"/>
        </View>
        <ScrollView style={{ height: "60%" }}>
          <Formik initialValues={{ email: "" }} onSubmit={handleOnSubmit}>
            {(formikprops) => (
              <View style={styles.formContainer}>
                <View style={styles.container_input}>
                  <InputText onChangeText={formikprops.handleChange("email")} value={formikprops.values.email} placeholder="Adresse E-mail" icon="envelope" color="#66A5F9" error={response} />
                </View>
                <Bouton type="submit"
                  onPress={formikprops.handleSubmit}
                  title="Envoyer l'email de réinitialisation"
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  resetPageContainer: {
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#F1F1F1',
},
  headerContainer: {
    height: '40%',
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
    justifyContent: "center",
    width: "100%",
  },
});

export default ResetMail;
