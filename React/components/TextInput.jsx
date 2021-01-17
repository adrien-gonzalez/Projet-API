import React from "react";
import { StyleSheet, TextInput, View, Text, ImagePropTypes } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InputText = (props) => {

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
    height: 13*windowWidth/100,
    width: 80*windowWidth/100,
    backgroundColor:"white",
    marginBottom: 20,
  },
});

export default InputText;
