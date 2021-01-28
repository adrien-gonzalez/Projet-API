import React, { useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CatParams from "../components/catParams";
// import TOKEN
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ParamsPage = ({navigation}) => {

  const [idUser, setId] = useState([]);

  SecureStore.getItemAsync("token").then(result => {
    const {id} = jwtDecode(result);
    setId(id);
  });

  return (
        <ScrollView style={{ height: "20%" }}>
    <View style={styles.container}>
        <View style={styles.container_top}>
          <Text style={styles.title}> Paramètres </Text>
        </View>
        <View style={styles.container_BlocParams}>
          <Text style={styles.titleParams}>Paramètres utilisateur</Text>
          <CatParams
            cat="Mes informations perso."
            iconStart={require("../assets/icons/user.png")}
            iconEnd={require("../assets/icons/arrow.png")}
            onPress={() => {
              navigation.navigate('ProfilePage', {
                screen: 'UserInfosPage',
                params: { idUser: idUser },
              });
            }}
          />
          <CatParams
            cat="Mes serveurs"
            iconStart={require("../assets/icons/gamepad.png")}
            iconEnd={require("../assets/icons/arrow.png")}
          />
        </View>
        <View style={styles.container_BlocParams}>
          <Text style={styles.titleParams}>Paramètres de l'application</Text>
          <CatParams
            cat="Notifications"
            iconStart={require("../assets/icons/bell.png")}
            iconEnd={require("../assets/icons/arrow.png")}
          />
          <CatParams
            cat="Apparences"
            iconStart={require("../assets/icons/eye.png")}
            iconEnd={require("../assets/icons/arrow.png")}
          />
          <CatParams
            cat="Langues"
            iconStart={require("../assets/icons/lang.png")}
            iconEnd={require("../assets/icons/arrow.png")}
          />
        </View>
        <View style={styles.container_BlocParams}>
          <Text style={styles.titleParams}>Infos supplémentaires</Text>
          <CatParams
            cat="Confidentialités & Securité"
            iconStart={require("../assets/icons/lock.png")}
            iconEnd={require("../assets/icons/arrow.png")}
          />
          <CatParams
            cat="Aide & Support"
            iconStart={require("../assets/icons/audio.png")}
            iconEnd={require("../assets/icons/arrow.png")}
          />
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
    width: windowWidth,
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
});

export default ParamsPage;
