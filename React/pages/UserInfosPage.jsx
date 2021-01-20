import React, {useEffect,useState} from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import InputText from "../components/TextInput";
import { Dimensions } from "react-native";
import Bouton from "../components/bouton";
import { Formik } from "formik";
import userAPI from '../services/userAPI.js'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserInfosPage = () => {

  const [infos, setInfos] = useState([]);

  const id = "11";

  const fetchInfosUser = async () => {
    try {
      const data = await userAPI.checkUser(id);
      console.log(data)
      data.map((d) => {
        setInfos({
          login:d.login,
          email:d.email,
        })
      })
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchInfosUser();
  },[]);
  console.log(infos);

  return (
    <View style={styles.connectPageContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Informations perso.</Text>
      </View>
      <ScrollView style={{ height: "60%" }}>
        <Formik
          initialValues={{ password: "", conf_password: "", email: "", login:"" }}
        >
          {(formikprops) => (
            <View style={styles.formContainer}>
              <InputText
                placeholder="Nom d'utilisateur"
                icon="user"
                color="#66A5F9"
                value={formikprops.values.login}
              />
              <InputText
                placeholder="Adresse email"
                icon="envelope"
                color="#66A5F9"
                value={formikprops.values.email}
              />
              <InputText
                placeholder="Mot de passe"
                type="password"
                icon="lock"
                color="#66A5F9"
                value={formikprops.values.password}
              />
              <InputText
                placeholder="Confirmation du mot de passe"
                type="password"
                icon="lock"
                color="#66A5F9"
                value={formikprops.values.conf_password}
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