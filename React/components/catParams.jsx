import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from 'react-redux';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const CatParams = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <FontAwesome5 name={props.iconStart} size={24} color={props.apparence.dark ? 'white' : 'black'} />
        <Text style={{
          fontSize: 18,
          flex: 0.9,
          color: props.apparence.dark ? 'white' : '#262626',
        }}> {props.cat} </Text>
        <MaterialIcons name={props.iconEnd} size={24} color={props.apparence.dark ? 'white' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ apparence }) => ({
  apparence,
});

export default connect(mapStateToProps)(CatParams);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth - 75,
    flex: 0.4,
    marginTop: 8,
  },
});

