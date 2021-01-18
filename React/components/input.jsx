import React from "react";
import { StyleSheet, TextInput, View} from "react-native";

const Input = (props) => {

  return (
    <View>
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
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
