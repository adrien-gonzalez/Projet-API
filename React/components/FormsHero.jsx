import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Header extends React.Component {
    render() {
        return (
            <ImageBackground style={styles.hero} source={require("../assets/login-hero.png")}>
                <Text style={styles.text}>Connexion</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    hero: {
        width: 120*windowWidth/100,
        height: 120*windowWidth/100,
        position: 'absolute',
        top: '-60%',
        left: '-5%',
    },
    text: {
        width: '100%',
        textAlign: 'center',
        left: '-5%',
        color: "white",
        fontSize: 42,
        fontFamily: 'HomepageBaukasten',
        position: 'absolute',
        bottom: -12,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 4,
    },
})


