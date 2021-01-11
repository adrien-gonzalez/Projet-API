import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";

const Bouton = (props) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("test")}
        underlayColor="white"
        activeOpacity={0.80}
      >
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: 150,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#66A5F9",
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontSize: 16,
  },
});

export default Bouton;
