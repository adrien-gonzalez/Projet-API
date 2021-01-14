import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import GamesAPI from "../services/gamesAPI";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const SelectGamePage = () => {

    const [games, setGames] = useState([]);
    
    const fetchGames = async () => {
    try {
        const data = await GamesAPI.findAll();
        setGames(data);
    } catch (error) {
        console.log(error);
        console.log("nope");
    }
    };

    useEffect(() => {
    fetchGames();
    }, []);
    console.log(games);

    return (
        <View style={styles.globalPage}>
            <ScrollView style={styles.pageContainer}>
                <ImageBackground
                source={require('../assets/selectgamepattern.png')}
                style={styles.gameListPattern}
                imageStyle={{
                    resizeMode: 'repeat',
                    overflow: 'visible',
                    backfaceVisibility: 'visible',
                    flex: 1,
                }}>
                    <View style={styles.gameList}>
                        {games.map((games) => {
                            return (
                                <View style={styles.gameContainer} key={games.id}>
                                    <Image style={styles.gameImage} source={{uri: 'https://gameservapi.000webhostapp.com/assets/'+games.image}} />
                                    <Text style={{color: games.color, textAlign: 'center', fontSize: 18, fontFamily: 'TwCent',textTransform: 'uppercase', letterSpacing: 4}}>{games.name}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
      backgroundColor: '#000000',
    },
    globalPage: {
        height: '100%',
        backgroundColor: '#000000',
    },
    gameContainer: {
        height: windowHeight*30/100,
        width: '40%',
        // backgroundColor: 'red',
        marginTop: '6%',
        // flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // alignItems: 'space-around',
    },
    gameImage: {
        height: '90%',
        width: '100%',
        borderRadius: 10,
    },
    gameListPattern: {
        height: '100%',
        width: '100%',
        backgroundColor: '#000000',
    },
    gameList: {
        paddingTop: '8%',
        paddingBottom: '8%',
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
});

export default SelectGamePage;