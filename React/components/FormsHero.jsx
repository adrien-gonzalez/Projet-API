import React from 'react';
import { ProgressBarAndroidComponent } from 'react-native';
import { Text, Platform, StyleSheet, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import Topbar from './Topbar';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.title == "Connexion") {
            var image = require('../assets/login-hero.png');
        }
        else if (this.props.title == "Inscription") {
            var image = require('../assets/register-hero.png');
        }
		else if (this.props.title == "Ajouter un serveur") {
            var image = require('../assets/addserv-hero.png');

        }
        else if (this.props.title == "Mot de passe oublié") {
            var image = require('../assets/reset-hero.png');
        }      
        else if (this.props.title == "Modifier un serveur") {
            var image = require('../assets/updateserver-hero.png');
        }           
        return (
            <ImageBackground style={styles.hero} source={image}>
                {this.props.needBar == true && (
                <Topbar color="white" isText={false} navigation={this.props.navigation} backgroundColor="transparent" />
                )}
                <Text style={styles.text}>{this.props.title}</Text>
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
        fontSize: Platform.OS === 'ios' ? 11*windowWidth/100 : 11*windowWidth/100,
        fontFamily: 'HomepageBaukasten',
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? '9%' : '6%',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 4,
    },
})


