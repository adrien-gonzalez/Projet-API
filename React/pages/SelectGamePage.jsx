import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import GamesAPI from "../services/gamesAPI";
import * as SecureStore from 'expo-secure-store';
import { connect } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const SelectGamePage = (props) => {
    
    const navigation = useNavigation();
    const [games, setGames] = useState([]);
    // console.log(games);

    const combinedFunctions = (id, gamecolor) => {
        _updateSelectedGame(id, gamecolor);
        navigation.navigate("ServersPage");
    }

    const _updateSelectedGame = (id, gamecolor) => {
        const action = { type: "UPDATE_SELECTED_GAME", value: {id: id, gamecolor: gamecolor} }
        props.dispatch(action)
        // console.log(id)
    }
    
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
    // console.log(games);

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
                                    <TouchableOpacity style={{height: '100%', width: '100%'}} onPress={
                                        () => combinedFunctions(games.id, games.color)
                                        }
                                        >
                                        <Image style={styles.gameImage} source={{uri: 'https://nicolas-camilloni.students-laplateforme.io/assets/'+games.image}} />
                                        <Text style={{color: games.color, textAlign: 'center', fontSize: 18, fontFamily: 'TwCent',textTransform: 'uppercase', letterSpacing: 4}}>{games.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapDispatchToProps)(SelectGamePage);

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