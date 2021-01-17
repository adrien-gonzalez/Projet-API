import React from 'react';
import { Text, Platform, StyleSheet, ImageBackground } from 'react-native';
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
        width: '100%',
        height: '100%',
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: "white",
        fontSize: Platform.OS === 'ios' ? 11*windowWidth/100 : 10*windowWidth/100,
        fontFamily: 'HomepageBaukasten',
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? '9%' : '7%',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 4,
    },
})


