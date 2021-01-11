import React from "react";
import { StyleSheet, TextInput, View,Text } from "react-native";

const Input = (props) => {

  return (
    <View>
      <TextInput
        name={props.name}
        placeholder={props.placeholder}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#C1C1C1",
    borderRadius: 15,
    textAlign: "center",
    width:250,
    backgroundColor:"white",
  },
});

export default Input;
