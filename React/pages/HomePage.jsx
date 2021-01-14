import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import GamesAPI from "../services/gamesAPI";

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
  console.log(games);
  
    return (
        <View style={styles.globalPage}>
            <ScrollView style={styles.pageContainer}>
                <Text>
                  {games.map((games) => (
                    games.name
                  ))}
                </Text>
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
      // flex: 1,
      // paddingTop: '12%',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    navBarBot: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '15%',
    },
    pageContainer: {
      backgroundColor: 'grey',
    },
    globalPage: {
        height: '100%',
        backgroundColor: 'grey',
    },
});

export default HomePage;