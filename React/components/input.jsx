import React from "react";
import { StyleSheet, TextInput, View, Text, ImagePropTypes } from "react-native";

const Input = (props) => {

  return (
    <View>
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
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
    height: 50,
    width:300,
    backgroundColor:"white",
  },
});

export default Input;
