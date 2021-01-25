import React from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ImagePropTypes,
} from "react-native";
import { Dimensions } from 'react-native';
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Bouton = (props) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          props.selectedGame.gamecolor ?
          {
            width: 60*windowWidth/100,
            height: 7*windowHeight/100,
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: props.selectedGame.gamecolor,
          }
          :
          {
            width: 60*windowWidth/100,
            height: 7*windowHeight/100,
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: "#00bcff",
          }
        }
        onPress={props.onPress}
        underlayColor="white"
        activeOpacity={0.80}
      >
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ selectedGame }) => ({
  selectedGame
});

export default connect(mapStateToProps)(Bouton);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: 60*windowWidth/100,
    height: 7*windowHeight/100,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#00bcff",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: Platform.OS === 'ios' ? 20 : 16,
    fontFamily: 'HomepageBaukasten',
  },
});
