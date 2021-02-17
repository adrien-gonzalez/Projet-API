import React ,{ useState } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fumi } from "react-native-textinput-effects";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InputText = (props) => {

  const [hidePass, setHidePass] = useState(true);

  if (props.type == "password") {
    return (
      <View style={{ width: "80%", paddingBottom: 34, position:"relative"}}>
        <Fumi
          label={props.placeholder}
          iconClass={FontAwesome5}
          iconName={props.icon}
          iconColor={
            props.selectedGame.gamecolor
              ? props.selectedGame.gamecolor
              : props.color
          }
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          secureTextEntry={hidePass ? true : false}
          style={{ borderRadius: 20 }}
          value={props.value}
          onChangeText={props.onChangeText}
          value={props.value}
        />
        <TouchableOpacity onPress={() => setHidePass(!hidePass)} style={{position:"absolute", top:22, left:250}}>
        <FontAwesome5 name={hidePass ? "eye-slash" : "eye"} size={24} color="#808080" />
        </TouchableOpacity>
        <Text style={styles.errors}>{props.error}</Text>
      </View>
    );
  } else {
    return (
      <View style={{ width: "80%", paddingBottom: 34 }}>
        <Fumi
          label={props.placeholder}
          iconClass={FontAwesome5}
          iconName={props.icon}
          iconColor={
            props.selectedGame.gamecolor
              ? props.selectedGame.gamecolor
              : props.color
          }
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{ borderRadius: 20 }}
          onChangeText={props.onChangeText}
          value={props.value}
          height={props.height}
          textAlignVertical={props.textAlignVertical}
          numberOfLines={props.numberOfLines}
          multiline={props.multiline}
        />
        <Text style={styles.errors}>{props.error}</Text>
      </View>
    );
  }
};

const mapStateToProps = ({ selectedGame }) => ({
  selectedGame,
});

export default connect(mapStateToProps)(InputText);

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#C1C1C1",
    borderRadius: 20,
    height: (14 * windowWidth) / 100,
    paddingLeft: 18,
    width: (80 * windowWidth) / 100,
    backgroundColor: "white",
    marginBottom: 28,
    fontSize: Platform.OS === "ios" ? 18 : 14,
  },
  errors: {
    color: "salmon",
    textAlign: "center",
    fontFamily: "HomepageBaukasten",
    fontSize: 12,
    marginTop: 8,
  },
});
