import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import InputText from "../components/TextInput";
import { Dimensions } from "react-native";
import Bouton from "../components/bouton";
import { Formik } from "formik";
import userAPI from "../services/userAPI.js";

// import TOKEN
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserInfosPage = ({ navigation }) => {
  const [infos, setInfos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResponse] = useState([]);
  // const [idToken, setIdToken] = useState([]);

  // SecureStore.getItemAsync("token").then((result) =>
  //   setIdToken(jwtDecode(result).id)
  // );

  const fetchInfosUser = async () => {
      try {
        const data = await userAPI.checkUser("11");
        data.map((d) => {
          setInfos({
            login: d.login,
            email: d.email,
          });
        });
      } catch (error) {
        console.log(error);
      }
  };

  // console.log(idToken);
    useEffect( () => {
      fetchInfosUser();
    }, []);

  const handleOnSubmitSupp = async (values, actions) => {
    const donnees = new URLSearchParams();
    donnees.append("password", values.password);

    try {
      const data = await userAPI.deleteUser(donnees);
      console.log(data);
      if (typeof data == "object") {
        data.map((d) => {
          setResponse(d.password_error);
        });
      } else {
        setResponse(data);
        navigation.navigate("HomePage");
      }
    } catch (error) {
      setResponse(error);
    }
  };

  const handleOnSubmitPut = async (values, actions) => {
    console.log(values);

    // const donnees = new URLSearchParams();
    // donnees.append("password", values.password);

    // try {
    //   const data = await userAPI.deleteUser(id, donnees);
    //   console.log(data);
    //   if (typeof data == "object") {
    //     data.map((d) => {
    //       setResponse(d.password_error);
    //     });
    //   } else {
    //     setResponse(data);
    //     navigation.navigate("HomePage");
    //   }
    // } catch (error) {
    //   setResponse(error);
    // }
  };

  return (
    <View style={styles.connectPageContainer}>
      {/* Debut modal confirmation SuppUser */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Supprimer le compte</Text>
            <Text style={styles.modalContent}>
              {" "}
              Etes-vous sûr(e) de vouloir supprimer votre compte ?{" "}
            </Text>
            <Text style={styles.modalInfos}>
              {" "}
              Cette action vous déconnectera immédiatement de votre compte et
              vous ne pourrez plus vous reconnecter.{" "}
            </Text>
            <Formik
              enableReinitialize
              initialValues={{
                password: "",
              }}
              onSubmit={handleOnSubmitSupp}
            >
              {(formikprops) => (
                <View style={{ width: "100%", alignItems: "center" }}>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "white",
                      borderBottomColor: "grey",
                      borderWidth: 1,
                      width: "80%",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                    secureTextEntry={true}
                    placeholder="Mot de passe"
                    onChangeText={formikprops.handleChange("password")}
                    value={formikprops.values.password}
                  />
                  <Text style={styles.errors}>{response}</Text>
                  <View style={styles.fixToText}>
                    <TouchableOpacity
                      style={styles.boutonRight}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setResponse();
                      }}
                    >
                      <Text style={styles.buttonTextLeft}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.boutonRight}
                      onPress={formikprops.handleSubmit}
                    >
                      <Text style={styles.buttonTextRight}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
      {/* Fin modal confirmation SuppUser */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Informations perso.</Text>
      </View>
      <ScrollView style={{ height: "60%" }}>
        <Formik
          enableReinitialize
          initialValues={{
            email: infos.email,
            login: infos.login,
            password: "",
            conf_password: "",
          }}
          onSubmit={handleOnSubmitPut}
        >
          {(formikprops) => (
            <View style={styles.formContainer}>
              <InputText
                placeholder="Nom d'utilisateur"
                icon="user"
                color="#66A5F9"
                value={formikprops.values.login}
                onChangeText={formikprops.handleChange("login")}
              />
              <InputText
                placeholder="Adresse email"
                icon="envelope"
                color="#66A5F9"
                value={formikprops.values.email}
                onChangeText={formikprops.handleChange("email")}
              />
              <InputText
                placeholder="Mot de passe"
                type="password"
                icon="lock"
                color="#66A5F9"
                value={formikprops.values.password}
                onChangeText={formikprops.handleChange("password")}
              />
              <InputText
                placeholder="Confirmation du mot de passe"
                type="password"
                icon="lock"
                color="#66A5F9"
                value={formikprops.values.conf_password}
                onChangeText={formikprops.handleChange("conf_password")}
              />
              <Bouton
                onPress={formikprops.handleSubmit}
                title="Modifier mon profil"
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={styles.suppCompte}>Supprimer mon compte</Text>
              </TouchableOpacity>
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
  suppCompte: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 40,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowWidth - 50,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#F3F3F3",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalContent: {
    textAlign: "center",
    width: "90%",
    fontSize: 16,
  },
  modalInfos: {
    textAlign: "center",
    width: "90%",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: "#D67777",
  },
  input: {
    borderBottomColor: "black",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F3F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: "100%",
  },
  boutonRight: {
    width: "50%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  boutonLeft: {
    width: "50%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonTextLeft: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  buttonTextRight: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    paddingRight: 20,
  },
  errors: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
  },
});

export default UserInfosPage;
