import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image as img} from 'react-native';
import Svg, { Path, Rect, Image} from 'react-native-svg';
import serverAPI from '../services/server.js'


const ServerInfo = (props) => {

    return(
        <View style={styles.contain}>
            <View style={styles.server}>
                <View style={styles.svgHeader}>
                    <ImageBackground source={require("../assets/Minecraft_infoServer.png")} style={styles.image}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <Rect width="100%" height="100%" fill="black" opacity="0.43"/>
                        </Svg>
                        <Image  source={require('../assets/banniere_server.jpg')} style={styles.miniature}/>
                       
                       
                    </ImageBackground>
                </View>
            </View>
        </View>
    )
}
export default ServerInfo

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
        width: '100%',
    },
    svgHeader: {
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    server: {
        height: 250,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    miniature: {
        // height: 96,
        // width: '100%',
    },
})