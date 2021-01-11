import React from "react";
import { Dimensions } from 'react-native';
import Input from "../components/input.jsx";
import Bouton from "../components/bouton.jsx";
import { StyleSheet, Image, Text, View } from "react-native";

const windowHeight = Dimensions.get('window').height;

const ResetPassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container_top}>
        <Image
          style={styles.image}
          source={require("../assets/updates-catspandas_latest.jpg")}
        />
        <Text style={styles.title}> Réinitialisation du mot de passe</Text>
      </View>
      <View style={styles.container_form}>
        <Input placeholder="Nouveau mot de passe" name="password" />
        <Input placeholder="Confirmation du mot de passe" name="conf_password" />
        <Bouton title="Modifier" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    minHeight: windowHeight,
  },
  container_top: {
    flex: 0.1,
    alignItems: "center",
  },
  container_form: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    textShadowColor: "#000000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    color: "#FEFEFE",
    position: "absolute",
    top: 180,
    left: 110,
    width:180,
  },
  image: {
    width: 400,
    height: 200,
    alignContent: "flex-start",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
});

export default ResetPassword;
