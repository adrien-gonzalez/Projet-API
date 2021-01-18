import React from "react";
import { StyleSheet, Platform, TextInput, View } from "react-native";
import { Dimensions } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InputText = (props) => {

  if ( props.type == 'password' ) {
    return (
      <View style={{width: '80%', paddingBottom: 34}}>
        <Fumi
          label={props.placeholder}
          iconClass={FontAwesomeIcon}
          iconName={props.icon}
          iconColor={props.color}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          secureTextEntry={true}
          style={{borderRadius: 20}}
          />
      </View>
    );
  }
  else {
    return (
      <View style={{width: '80%', paddingBottom: 34}}>
      <Fumi
        label={props.placeholder}
        iconClass={FontAwesomeIcon}
        iconName={props.icon}
        iconColor={props.color}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        style={{borderRadius: 20}}
        />
    </View>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#C1C1C1",
    borderRadius: 20,
    height: 14*windowWidth/100,
    paddingLeft: 18,
    width: 80*windowWidth/100,
    backgroundColor:"white",
    marginBottom: 28,
    fontSize: Platform.OS === 'ios' ? 18 : 14,
  },
});

export default InputText;
