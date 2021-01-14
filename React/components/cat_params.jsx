import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const CatParams = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStart}
        source={props.iconStart}
      />
      <Text style={styles.title}> {props.cat} </Text>
      <Image style={styles.imageEnd} source={props.iconEnd}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "maroon",
    width: windowWidth - 75,
    flex: 0.4,
  },
  title: {
    fontSize: 18,
    flex:0.9,
  },
  imageStart: {
    width: 22,
    height: 22,
  },
  imageEnd: {
    width: 12,
    height: 12,
  },
});

export default CatParams;
