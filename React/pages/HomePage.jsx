import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Text, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import Bouton from '../components/bouton';
import GamesAPI from "../services/gamesAPI";
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import HomeCarousel from '../components/HomeCarousel';
import { Ionicons, Feather } from '@expo/vector-icons';
import { connect } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomePage = (props) => {

  const navigation = useNavigation();

  const _updateIsLogged = (id, gamecolor, slug) => {
    const action = { type: "UPDATE_SELECTED_GAME", value: {id: id, gamecolor: gamecolor, slug: slug} }
    props.dispatch(action)
    // console.log(id)
  }

    // GESTION DES COULEURS DE L'APP
  const appColor = props.selectedGame.gamecolor ? props.selectedGame.gamecolor : "#00BCFF";

  const appImages = props.selectedGame.id ? props.selectedGame.id : 0;
    switch (appImages) {
      case "1":
          var appLogo = require('../assets/app-logos/appLogo1.png');
          var LightPath = require('../assets/homepage/LightPath1.png')
          var DarkPath = require('../assets/homepage/DarkPath1.png')
          break;
      case "2":
          var appLogo = require('../assets/app-logos/appLogo2.png');
          var LightPath = require('../assets/homepage/LightPath2.png')
          var DarkPath = require('../assets/homepage/DarkPath2.png')
          break;
      case "3":
          var appLogo = require('../assets/app-logos/appLogo3.png');
          var LightPath = require('../assets/homepage/LightPath3.png')
          var DarkPath = require('../assets/homepage/DarkPath3.png')
          break;
      case "4":
          var appLogo = require('../assets/app-logos/appLogo4.png');
          var LightPath = require('../assets/homepage/LightPath4.png')
          var DarkPath = require('../assets/homepage/DarkPath4.png')
          break;
      case "5":
          var appLogo = require('../assets/app-logos/appLogo5.png');
          var LightPath = require('../assets/homepage/LightPath5.png')
          var DarkPath = require('../assets/homepage/DarkPath5.png')
          break;
      case "6":
          var appLogo = require('../assets/app-logos/appLogo6.png');
          var LightPath = require('../assets/homepage/LightPath6.png')
          var DarkPath = require('../assets/homepage/DarkPath6.png')
          break;
      default:
          var appLogo = require('../assets/app-logos/appLogo.png');
          var LightPath = require('../assets/homepage/LightPath.png')
          var DarkPath = require('../assets/homepage/DarkPath.png')
    };

  // GESTION RECUPERATION DES JEUX POPULAIRES
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const data = await GamesAPI.findPopular();
      setGames(data);
    } catch (error) {
      // console.log(error);
      console.log("nope");
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // VUE
  return (
      <View style={styles.globalPage}>
          <ScrollView style={styles.pageContainer}>
              <ImageBackground
                source={require('../assets/bg-minecraft-dark.png')}
                style={styles.containerHero}
              >
                <Image style={{width: '90%'}} resizeMode='contain' source={appLogo} />
                <Text style={styles.textHero}>Les meilleurs serveurs <Text style={{color: appColor}}>francophones</Text> répertoriés ici</Text>
                <HomeCarousel navigation={navigation} />
              </ImageBackground>
              <View style={{
                width: windowWidth,
                backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 40,
                paddingBottom: 60,
              }}>
                <Ionicons name="md-game-controller-outline" size={80} color={appColor} />
                <Text style={{
                  fontSize: Platform.OS == 'ios' ? 24 : 22,
                  fontFamily: 'HomepageBaukasten',
                  color: props.apparence.dark ? 'white' : '#262626',
                }}>Pour les gamers</Text>
                <Text style={{
                  fontSize: Platform.OS == 'ios' ? 20 : 18,
                  fontFamily: 'HomepageBaukasten',
                  color: props.apparence.dark ? 'white' : '#262626',
                  textAlign: 'center',
                  marginTop: 24,
                }}>Découvrez les <Text style={{color: appColor}}>meilleurs</Text> serveurs{"\n"}de jeux <Text style={{color: appColor}}>francophones</Text></Text>
                <View style={{postion: 'absolute', width: windowWidth, alignItems: 'center'}}>
                  <Text style={{position: 'absolute', top: '12%', left: 45*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, color: props.apparence.dark ? 'white': 'black',}}>Sélectionnez un jeu</Text>
                  <Text style={{position: 'absolute', top: '36%', left: 14*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, textAlign: 'right', color: props.apparence.dark ? 'white': 'black',}}>Trouvez le serveur{"\n"}de vos rêves</Text>
                  <Text style={{position: 'absolute', top: '59%', left: 52*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 15 : 13, textAlign: 'left', color: props.apparence.dark ? 'white': 'black',}}>Votez pour lui et faites{"\n"}le gagner en popularité</Text>
                  <Text style={{position: 'absolute', top: '90%', left: 14*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, textAlign: 'right', color: props.apparence.dark ? 'white': 'black',}}>Gagnez des{"\n"}récompenses</Text>
                  <Image style={{position: 'absolute', top: '44%', left: -14*windowWidth/100}} source={require('../assets/ladder-minecraft.png')} />
                  <Image style={{position: 'absolute', top: '72%', left: 57*windowWidth/100}} source={require('../assets/ladder-ark.png')} />
                  <Image style={{position: 'absolute', top: '14%', left: 64*windowWidth/100}} source={require('../assets/ladder-dofus.png')} />
                  <Image style={styles.laderstep} source={LightPath} />
                </View>
                <View style={{marginTop: 100}}>
                  <Bouton title="Liste des serveurs" onPress={() => navigation.navigate("ServersListPage")} />
                </View>
              </View>

              {/* FOR CREATORS */}
              <View style={{
                width: windowWidth,
                backgroundColor: props.apparence.dark ? '#2A2657' : '#262626',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 40,
                paddingBottom: 160,
              }}>
                <Feather name="hard-drive" size={80} color={appColor} />
                <Text style={styles.underIconTextCreators}>Pour les créateurs</Text>
                <Text style={styles.underIconDescTextCreators}>Ajoutez <Text style={{color: appColor}}>simplement</Text> votre serveur{"\n"}et faites le monter en <Text style={{color: appColor}}>popularité</Text></Text>
                <View style={{postion: 'absolute', width: windowWidth, alignItems: 'center'}}>
                  <Text style={{position: 'absolute', top: '12%', left: 14*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, color: 'white'}}>Sélectionnez un jeu</Text>
                  <Text style={{position: 'absolute', top: '38%', left: 46*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 17 : 15, textAlign: 'right', color: 'white'}}>Remplissez le formulaire</Text>
                  <Text style={{position: 'absolute', top: '59%', left: 4*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 15 : 13, textAlign: 'right', color: 'white'}}>Récompensez vos{"\n"}joueurs en utilisant un{"\n"}plugin de votes</Text>
                  <Text style={{position: 'absolute', top: '90%', left: 55*windowWidth/100, fontFamily: 'HomepageBaukasten', fontSize: Platform.OS == 'ios' ? 15 : 13, textAlign: 'left', color: 'white'}}>Appréciez la montée{"\n"}en popularité de votre{"\n"}serveur</Text>
                  <Image style={{position: 'absolute', top: '23%', left: 36*windowWidth/100}} source={require('../assets/ladder-wow.png')} />
                  <Image style={{position: 'absolute', top: '72%', left: -26*windowWidth/100}} source={require('../assets/ladder-discord.png')} />
                  <Image style={{position: 'absolute', top: '14%', left: -15*windowWidth/100}} source={require('../assets/ladder-arma.png')} />
                  <Image style={styles.laderstep} source={DarkPath} />
                </View>
                <View style={{marginTop: 140}}>
                  <Bouton title="Ajouter un serveur" onPress={() => navigation.navigate("AddServerPage")} />
                </View>
              </View>
          </ScrollView>
      </View>
  );
}

// RECUP DU STORE REDUX
const mapStateToProps = ({ selectedGame, auth, apparence }) => ({
  selectedGame, auth, apparence,
});

export default connect(mapStateToProps)(HomePage);


// CSS
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
