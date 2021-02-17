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
import Bouton from "../components/bouton";

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
          <Text style={{
            justifyContent: "flex-start",
            fontSize: 22,
            fontWeight: "bold",
            color: props.selectedGame.gamecolor,
            width: windowWidth - 75,
            marginTop: 34,
          }}>Paramètres utilisateur</Text>
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
          <Text style={{
            justifyContent: "flex-start",
            fontSize: 22,
            fontWeight: "bold",
            color: props.selectedGame.gamecolor,
            width: windowWidth - 75,
            marginTop: 24,
          }}>Paramètres utilisateur</Text>
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
    <ScrollView stickyHeaderIndices={[0]} style={{
      // marginBottom: 40,
    }}>
    <Topbar color={props.apparence.dark ? 'white' : '#262626'} title="Paramètres" isText={true} navigation={navigation} backgroundColor={props.apparence.dark ? '#080015' : 'white'} />
      <View style={{
        flex: 1,
        alignItems: 'center',
        minHeight: 100*windowHeight/100,
        // justifyContent: 'space-evenly',
        backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
      }}>
        {ParamUser()}
        <View style={styles.container_BlocParams}>
          <Text style={{
            justifyContent: "flex-start",
            fontSize: 22,
            fontWeight: "bold",
            color: props.selectedGame.gamecolor,
            width: windowWidth - 75,
            marginTop: 24,
          }}>Paramètres de l'application</Text>
          <CatParams
            cat="Notifications"
            iconStart="bell"
            iconEnd="keyboard-arrow-right"
          />
          <CatParams
            cat="Thème"
            iconStart="eye"
            iconEnd="keyboard-arrow-right"
            onPress={() => {
              navigation.navigate("ProfilePage", {
                screen: "ApparencePage",
              });
            }}
          />
        </View>
        <View style={styles.container_BlocParams}>
          <Text style={{
            justifyContent: "flex-start",
            fontSize: 22,
            fontWeight: "bold",
            color: props.selectedGame.gamecolor,
            width: windowWidth - 75,
            marginTop: 24,
          }}>Infos supplémentaires</Text>
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
            <Bouton title="Déconnexion" last={true} onPress={() => {
              SecureStore.deleteItemAsync("token");
              SecureStore.deleteItemAsync("refreshtoken");
              delete axios.defaults.headers["Authorization"];
              _updateIsLogged(false);
              navigation.navigate("HomePage");
            }} />
            // <TouchableOpacity
            // onPress={() => {
            //   SecureStore.deleteItemAsync("token");
            //   SecureStore.deleteItemAsync("refreshtoken");
            //   delete axios.defaults.headers["Authorization"];
            //   _updateIsLogged(false);
            //   navigation.navigate("HomePage");
            // }}
            // >
            //   <Text style={styles.deco}>Deconnexion</Text>
            // </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

// RECUP DU STORE REDUX
const mapStateToProps = ({ auth, apparence, selectedGame }) => ({
  auth,
  apparence,
  selectedGame,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParamsPage);

const styles = StyleSheet.create({
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
    // height: '',
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


// export default ParamsPage;
