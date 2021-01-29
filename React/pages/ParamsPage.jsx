import React, { useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CatParams from "../components/catParams";
// import TOKEN
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import Topbar from "../components/Topbar";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { connect } from "react-redux";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ParamsPage = (props) => {

  const _updateIsLogged = (isLogged) => {
    const action = { type: "UPDATE_ISLOGGED", value: { isLogged: isLogged } };
    props.dispatch(action);
  };

  const navigation = useNavigation();

  const [idUser, setId] = useState([]);

  SecureStore.getItemAsync("token").then((result) => {
    if (result !== null) {
      const { id } = jwtDecode(result);
      setId(id);
    }
  });

  function ParamUser() {
    if (props.auth.isLogged === true) {
      return (
        <View style={styles.container_BlocParams}>
          <Text style={styles.titleParams}>Paramètres utilisateur</Text>
          <CatParams
            cat="Mes informations perso."
            iconStart="user-alt"
            iconEnd="keyboard-arrow-right"
            onPress={() => {
              navigation.navigate("ProfilePage", {
                screen: "UserInfosPage",
                params: { idUser: idUser },
              });
            }}
          />
          <CatParams
            cat="Mes serveurs"
            iconStart="server"
            iconEnd="keyboard-arrow-right"
            onPress={() => {
              navigation.navigate("ProfilePage", {
                screen: "UserServerPage",
                params: { idUser: idUser },
              });
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container_BlocParams}>
          <Text style={styles.titleParams}>Paramètres utilisateur</Text>
          <CatParams
            cat="Se connecter"
            iconStart="user-alt"
            iconEnd="keyboard-arrow-right"
            onPress={() => {
              navigation.navigate("ProfilePage", {
                screen: "ConnectPage",
              });
            }}
          />
          <CatParams
            cat="S'inscrire"
            iconStart="user-plus"
            iconEnd="keyboard-arrow-right"
            onPress={() => {
              navigation.navigate("ProfilePage", {
                screen: "RegisterPage",
              });
            }}
          />
        </View>
      );
    }
  }

  return (
    <ScrollView stickyHeaderIndices={[0]} style={{ height: "20%" }}>
    <Topbar color="#262626" title="Paramètres" isText={true} navigation={navigation} backgroundColor="white" />
      <View style={styles.container}>
        {ParamUser()}
        <View style={styles.container_BlocParams}>
          <Text style={styles.titleParams}>Paramètres de l'application</Text>
          <CatParams
            cat="Notifications"
            iconStart="bell"
            iconEnd="keyboard-arrow-right"
          />
          <CatParams
            cat="Apparences"
            iconStart="eye"
            iconEnd="keyboard-arrow-right"
          />
        </View>
        <View style={styles.container_BlocParams}>
          <Text style={styles.titleParams}>Infos supplémentaires</Text>
          <CatParams
            cat="Confidentialités & Securité"
            iconStart="lock"
            iconEnd="keyboard-arrow-right"
          />
          <CatParams
            cat="Aide & Support"
            iconStart="headphones-alt"
            iconEnd="keyboard-arrow-right"
          />
          {props.auth.isLogged && (
            <TouchableOpacity
              onPress={() => {
                SecureStore.deleteItemAsync("token");
                SecureStore.deleteItemAsync("refreshtoken");
                delete axios.defaults.headers["Authorization"];
                _updateIsLogged(false);
                navigation.navigate("HomePage");
              }}
            >
              <Text style={styles.deco}>Deconnexion</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    minHeight: windowHeight,
    justifyContent: "space-evenly",
    backgroundColor: "#F1F1F1",
  },
  container_top: {
    flex: 0.075,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth,
  },
  container_BlocParams: {
    alignItems: "center",
    width: windowWidth - 75,
    flex: 0.2,
  },
  titleParams: {
    justifyContent: "flex-start",
    fontSize: 22,
    fontWeight: "bold",
    color: "#66A5F9",
    width: windowWidth - 75,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#262626",
    paddingTop: windowHeight / 40,
  },
  deco: {
    color: "coral",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    margin: 20,
  },
});

// RECUP DU STORE REDUX
const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParamsPage);

// export default ParamsPage;
