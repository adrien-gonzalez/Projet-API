import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { connect } from "react-redux";

const windowWidth = Dimensions.get('window').width;

const TabGame = (props) => {
    
    const navigation = useNavigation();
    // console.log(props);

    const gamesLogos = props.selectedGame.id;

    switch (gamesLogos) {
        case "1":
            var gameSelected = require('../assets/logos/minecraft-logo.png');
            break;
        case "2":
            var gameSelected = require('../assets/logos/hytale-logo.png');
            break;
        case "3":
            var gameSelected = require('../assets/logos/gtav-logo.png');
            break;
        case "4":
            var gameSelected = require('../assets/logos/discord-logo.png');
            break;
        case "5":
            var gameSelected = require('../assets/logos/ark-logo.png');
            break;
        case "6":
            var gameSelected = require('../assets/logos/gmod-logo.png');
            break;
        case "7":
            var gameSelected = require('../assets/logos/gtav-logo.png');
            break;
        case "8":
            var gameSelected = require('../assets/logos/gtav-logo.png');
            break;
        default:
            var gameSelected = require('../assets/logos/unselected-logo.png');
    }

    return (
        <TouchableOpacity activeOpacity={1} style={
            props.selectedGame.id != 0 ?
            {
                backgroundColor: props.selectedGame.gamecolor, position: 'absolute',
                top: -40,
                height: windowWidth*25/100,
                borderRadius: 2000,
                borderWidth: 6,
                borderColor: props.apparence.dark ? '#242048' : 'white',
                left: (windowWidth*50/100)-(windowWidth*25/100)/2,
                width: windowWidth*25/100,
                zIndex: 1000,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }
            :
            {
                backgroundColor: (props.apparence.dark ? '#160730' : "whitesmoke"), position: 'absolute',
                top: -40,
                height: windowWidth*25/100,
                borderRadius: 2000,
                borderWidth: 6,
                borderColor: props.apparence.dark ? '#242048' : 'white',
                left: (windowWidth*50/100)-(windowWidth*25/100)/2,
                width: windowWidth*25/100,
                zIndex: 1000,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }
        
        } onPress={() => navigation.navigate(props.page)}>
            <View>
                <Image resizeMode={'contain'} style={styles.btnIcon} source={gameSelected} />
            </View>
        </TouchableOpacity>
    );
}

const mapStateToProps = ({ selectedGame, apparence }) => ({
    selectedGame,
    apparence,
});

export default connect(mapStateToProps)(TabGame);

const styles = StyleSheet.create({
    btnContainer: {
        position: 'absolute',
        top: -40,
        height: windowWidth*25/100,
        borderRadius: 2000,
        borderWidth: 6,
        borderColor: 'white',
        left: (windowWidth*50/100)-(windowWidth*25/100)/2,
        width: windowWidth*25/100,
        zIndex: 1000,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameLogo: {
        height: '74%',
        width: '74%',
    },
    btnIcon: {
        height: windowWidth*16/100,
        width: windowWidth*16/100,
    },
});