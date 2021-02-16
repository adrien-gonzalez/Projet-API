import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, Dimensions} from "react-native";
import { connect } from "react-redux";

const windowHeight = Dimensions.get("window").height;

const Loading = (props) => {
    const { route, navigation } = props

    return (
        <View style={styles.loadingPage}>
            <ActivityIndicator color= {props.selectedGame.gamecolor} size='large'/>
        </View>
      );
}
const mapStateToProps = ({ selectedGame }) => ({
    selectedGame,
});
  
export default connect(mapStateToProps)(Loading);

const styles = StyleSheet.create({
    loadingPage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight - 20*windowHeight/100
    }
})
