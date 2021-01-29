import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const CatParams = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <FontAwesome5 name={props.iconStart} size={24} color="black" />
        <Text style={styles.title}> {props.cat} </Text>
        <MaterialIcons name={props.iconEnd} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth - 75,
    flex: 0.4,
  },
  title: {
    fontSize: 18,
    flex: 0.9,
  },
});

export default CatParams;
