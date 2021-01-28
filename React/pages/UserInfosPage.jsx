import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import InputText from "../components/TextInput";
import { Dimensions } from "react-native";
import Bouton from "../components/bouton";
import { Formik } from "formik";
import userAPI from "../services/userAPI.js";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

import { MaterialIcons } from '@expo/vector-icons'; 

import { useRef } from 'react';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserInfosPage = ({ route, navigation }) => {
  const [infos, setInfos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseSupp, setResponseSupp] = useState([]);
  const [responsePut, setResponsePut] = useState([]);
  const { idUser } = route.params;

  const [loginError, setLoginError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [oldPasswordError, setOldPasswordError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const scrollRef = useRef();

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 0.5,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri, type: pickerResult.type });
  };

  const fetchInfosUser = async () => {
    try {
      const data = await userAPI.checkUser(idUser);
      console.log(data);
      data.map((d) => {
        setInfos({
          login: d.login,
          email: d.email,
          pictureProfil: d.picture_profil,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
          setResponseSupp(d.password_error);
        });
      } else {
        setResponseSupp(data);
        setModalVisible(!modalVisible);
        navigation.goBack();
        navigation.navigate("HomePage");
      }
    } catch (error) {
      setResponseSupp(error);
    }
  };

  const handleOnSubmitPut = async (values, actions) => {

    // On set les messages d'erreur à null
    setLoginError("");
    setEmailError("");
    setOldPasswordError("");
    setPasswordError("");

    scrollRef.current?.scrollTo({x:0,y:0,animated:true});

    if (values.old_password == "" && values.password != "") {
      setOldPasswordError(
        "Le mot de passe est obligatoire pour modifier le mot de passe"
      );
    }

    // const donnees = new URLSearchParams();
    const donnees = new FormData();
    donnees.append("login", values.login);
    donnees.append("email", values.email);
    donnees.append("old_password", values.old_password);
    donnees.append("password", values.password);
    
    if(selectedImage != null) {
      const imageBody = {
        uri: selectedImage.localUri,
        name: selectedImage.localUri,
        type: "image/jpeg",
      };
      donnees.append("file", (imageBody));
    }

    try {
      const data = await userAPI.updateUser(donnees);
      // console.log(data);
      if (typeof data == "object") {
        data.map((d) => {
          if(d.login_error) {setLoginError(d.login_error)}
          if(d.email_error) {setEmailError(d.email_error)}
          if(d.old_password_error) {setOldPasswordError(d.old_password_error) }
          if(d.password_error) {setPasswordError(d.password_error)}
          else if (d.login_success || d.email_success || d.password_success) {
            setResponsePut("Informations modifiées");
          }
        });
      }
    } catch (error) {
      setResponsePut(error);
    }
  };

  function image(selectedImage) {
    if (selectedImage !== null) {
      return (
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.ViewProfil}>
          <View >
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.pictureProfil}
            />
          </View>
        </TouchableOpacity>

      );
    } else {
      return (
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.ViewProfil}>
          <View>
            <Image style={styles.pictureProfil}
              source={{
                uri:
                  "http://nicolas-camilloni.students-laplateforme.io/assets/usersPictures/" +
                  infos.pictureProfil,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
  }

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
                  <Text style={styles.errors}>{responseSupp}</Text>
                  <View style={styles.fixToText}>
                    <TouchableOpacity
                      style={styles.boutonRight}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setResponseSupp();
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
        <View style={styles.backTitle}>
          <TouchableOpacity style={styles.logoBack}  onPress={() => {
                        navigation.goBack();
                      }}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Informations perso.</Text>
        </View>
        {image(selectedImage)}
        <View style={styles.viewLogoPhoto}>
        <MaterialIcons style={styles.logoPhoto} name="add-a-photo" size={24} color="black" />
        </View>
      </View>
      <ScrollView ref={scrollRef} style={{ height: "60%" }}>
        <Formik
          enableReinitialize
          initialValues={{
            email: infos.email,
            login: infos.login,
            old_password: "",
            password: "",
          }}
          onSubmit={handleOnSubmitPut}
        >
          {(formikprops) => (
            <View style={styles.formContainer}>
              {/* <Text style={styles.success}>{responsePut}</Text> */}
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
                placeholder="Mot de passe actuel"
                type="password"
                icon="lock"
                color="#66A5F9"
                value={formikprops.values.old_password}
                onChangeText={formikprops.handleChange("old_password")}
                error={oldPasswordError}
              />
              <InputText
                placeholder="Nouveau mot de passe"
                type="password"
                icon="lock"
                color="#66A5F9"
                value={formikprops.values.password}
                onChangeText={formikprops.handleChange("password")}
                error={passwordError}
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
  connectPageContainer: {
    minHeight: "100%",
    width: "100%",
    backgroundColor: "#F1F1F1",
  },
  headerContainer: {
    height: "32%",
    alignItems: "center",
    justifyContent: "space-between",
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
    paddingTop: windowHeight / 20,
    paddingBottom: 10,
  },
  backTitle: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent:"space-evenly",
    alignSelf:"flex-start",
    width:"90%",
  },
  logoBack: {
    alignSelf:"flex-end",
    marginBottom:14,
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
  ViewProfil: {
    width: 120,
    height: 120,
    borderRadius: 200,
    borderColor:"#66A5F9",
    borderWidth:4,
    backgroundColor:"white",
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
  success: {
    color: "green",
    textAlign: "center",
    fontSize: 12,
  },
  pictureProfil: {
    width: "100%",
    height: "100%",
    resizeMode:"cover",
    borderRadius: 200,
    borderColor:"white",
    borderWidth:3,
  },
  logoPhoto: {
    alignSelf:"center",
  },
  viewLogoPhoto: {
    position: "relative",
    top:-30,
    left:37,
    height:35,
    width:35,
    backgroundColor:"white",
    borderRadius:20,
    justifyContent:"center", 
    borderColor:"#66A5F9",
    borderWidth:1,
  }
});

export default UserInfosPage;
