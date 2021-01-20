import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import GamesAPI from "../services/gamesAPI";
import { Dimensions } from 'react-native';
import { HomeCarousel } from '../components/HomeCarousel';
import { Ionicons, Feather } from '@expo/vector-icons';

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
                  source={require('../assets/bg-minecraft-dark.png')}
                  style={styles.containerHero}
                >
                  <Image style={{width: '90%'}} resizeMode='contain' source={require('../assets/logo-full.png')} />
                  <Text style={styles.textHero}>Les meilleurs serveurs <Text style={styles.gameColor}>francophones</Text> répertoriés ici</Text>
                  <HomeCarousel />
                </ImageBackground>
                <View style={styles.containerForGamers}>
                  <Ionicons name="md-game-controller-outline" size={80} color="#00bcff" />
                  <Text style={styles.underIconText}>Pour les gamers</Text>
                  <Text style={styles.underIconDescText}>Découvrez les <Text style={styles.gameColor}>meilleurs</Text> serveurs{"\n"}de jeux <Text style={styles.gameColor}>francophones</Text></Text>
                  <View style={{postion: 'absolute', width: windowWidth, alignItems: 'center'}}>
                    <Text style={{position: 'absolute', top: '12%', left: 45*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15,}}>Sélectionnez un jeu</Text>
                    <Text style={{position: 'absolute', top: '36%', left: 14*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, textAlign: 'right'}}>Trouvez le serveur{"\n"}de vos rêves</Text>
                    <Text style={{position: 'absolute', top: '59%', left: 52*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 15 : 13, textAlign: 'left'}}>Votez pour lui et faites{"\n"}le gagner en popularité</Text>
                    <Text style={{position: 'absolute', top: '90%', left: 14*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, textAlign: 'right'}}>Gagnez des{"\n"}récompenses</Text>
                    <Image style={{position: 'absolute', top: '44%', left: -14*windowWidth/100}} source={require('../assets/ladder-minecraft.png')} />
                    <Image style={{position: 'absolute', top: '72%', left: 57*windowWidth/100}} source={require('../assets/ladder-ark.png')} />
                    <Image style={{position: 'absolute', top: '14%', left: 64*windowWidth/100}} source={require('../assets/ladder-dofus.png')} />
                    <Image style={styles.laderstep} source={require('../assets/ladder-steps-forgamers.png')} />
                  </View>
                </View>

                {/* FOR CREATORS */}
                <View style={styles.containerForCreators}>
                  <Feather name="hard-drive" size={80} color="#00bcff" />
                  <Text style={styles.underIconTextCreators}>Pour les créateurs</Text>
                  <Text style={styles.underIconDescTextCreators}>Ajoutez <Text style={styles.gameColor}>simplement</Text> votre serveur{"\n"}et faites le monter en <Text style={styles.gameColor}>popularité</Text></Text>
                  <View style={{postion: 'absolute', width: windowWidth, alignItems: 'center'}}>
                    <Text style={{position: 'absolute', top: '12%', left: 14*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, color: 'white'}}>Sélectionnez un jeu</Text>
                    <Text style={{position: 'absolute', top: '38%', left: 46*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, textAlign: 'right', color: 'white'}}>Remplissez le formulaire</Text>
                    <Text style={{position: 'absolute', top: '59%', left: 4*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 15 : 13, textAlign: 'right', color: 'white'}}>Récompensez vos{"\n"}joueurs en utilisant un{"\n"}plugin de votes</Text>
                    <Text style={{position: 'absolute', top: '90%', left: 55*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 15 : 13, textAlign: 'left', color: 'white'}}>Appréciez la montée{"\n"}en popularité de votre{"\n"}serveur</Text>
                    <Image style={{position: 'absolute', top: '23%', left: 36*windowWidth/100}} source={require('../assets/ladder-wow.png')} />
                    <Image style={{position: 'absolute', top: '72%', left: -26*windowWidth/100}} source={require('../assets/ladder-discord.png')} />
                    <Image style={{position: 'absolute', top: '14%', left: -15*windowWidth/100}} source={require('../assets/ladder-arma.png')} />
                    <Image style={styles.laderstep} source={require('../assets/ladder-steps-forcreators.png')} />
                  </View>
                </View>
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
      height: 80*windowHeight/100,
      // paddingTop: 200,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageContainer: {
      backgroundColor: 'grey',
      minHeight: 100*windowHeight/100,
    },
    textHero: {
      textAlign: 'center',
      fontSize: Platform.OS == 'ios' ? 20 : 18,
      fontFamily: 'HomepageBaukasten',
      color: 'white',
      marginBottom: 34,
    },
    gameColor: {
      color: "#00bcff",
    },
    containerForGamers: {
      // minHeight: 150*windowHeight/100,
      width: windowWidth,
      backgroundColor: '#F1F1F1',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 100,
    },
    containerForCreators: {
      // minHeight: 150*windowHeight/100,
      width: windowWidth,
      backgroundColor: '#262626',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 240,
    },
    underIconText: {
      fontSize: Platform.OS == 'ios' ? 24 : 22,
      fontFamily: 'HomepageBaukasten',
      color: '#262626',
    },
    underIconDescText: {
      fontSize: Platform.OS == 'ios' ? 20 : 18,
      fontFamily: 'HomepageBaukasten',
      color: '#262626',
      textAlign: 'center',
      marginTop: 24,
    },
    underIconTextCreators: {
      fontSize: Platform.OS == 'ios' ? 24 : 22,
      fontFamily: 'HomepageBaukasten',
      color: 'white',
    },
    underIconDescTextCreators: {
      fontSize: Platform.OS == 'ios' ? 20 : 18,
      fontFamily: 'HomepageBaukasten',
      color: 'white',
      textAlign: 'center',
      marginTop: 24,
    },
    laderstep: {
      marginTop: 44,
    }
});

export default HomePage;