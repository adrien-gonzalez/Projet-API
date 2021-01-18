import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ImageBackground, StyleSheet } from 'react-native';
import GamesAPI from "../services/gamesAPI";
import { Dimensions } from 'react-native';
import { HomeCarousel } from '../components/HomeCarousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomePage = (props) => {

  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const data = await GamesAPI.findPopular();
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
                  source={require('../assets/bg-minecraft.jpg')}
                  style={styles.containerHero}
                >
                  <HomeCarousel layout={'default'} style={{backgroundColor: 'red'}} firstItem = {0} />
                </ImageBackground>
                <Text>
                  {games.map((games) => (
                    games.name
                  ))}
                </Text>
                <Text>TestStart</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
    },
    containerHero: {
      width: '100%',
      height: 70*windowHeight/100,
      backgroundColor: 'blue',
      // paddingTop: 200,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageContainer: {
      backgroundColor: 'grey',
      minHeight: 100*windowHeight/100,
    },
    globalPage: {
        height: '100%',
        backgroundColor: 'grey',
    },
});

export default HomePage;