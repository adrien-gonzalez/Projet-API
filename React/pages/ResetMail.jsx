import React from "react";
import { Dimensions } from 'react-native';
import Input from "../components/input.jsx";
import Bouton from "../components/bouton.jsx";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";

const windowHeight = Dimensions.get('window').height;

const ResetMail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container_top}>
        <Image
          style={styles.image}
          source={require("../assets/updates-catspandas_latest.jpg")}
        />
        <Text style={styles.title}> Mot de passe oublié </Text>
      </View>
      <View style={styles.container_form}>
        <Input placeholder="Adresse E-Mail" name="name" />
        <Bouton title="Réinitialiser le mot de passe" />
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
    left: 80,
  },
  image: {
    width: 400,
    height: 200,
    alignContent: "flex-start",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
});

export default ResetMail;
