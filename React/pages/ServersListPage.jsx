import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground,Dimensions} from 'react-native';
import serverAPI from '../services/serverAPI.js'
import Svg, { Circle, Path, G, Image as Img} from 'react-native-svg';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/loading'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Topbar from '../components/Topbar.jsx';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ServersListPage = (props) => {
  
  const navigation = useNavigation();
  const [servers, setServer] = useState([]);
  const [game, setGame] = useState([]);
  const [load, setLoad] = useState(false);

  const combinedFunctions = (id) => {
    _updateSelectedGame(id);
    navigation.navigate("ServersListPage", {
      screen: "ServerInfoPage",
    })
  }

  const _updateSelectedGame = (id) => {
      const action = { type: "UPDATE_SELECTED_SERVER", value: {id: id} }
      props.dispatch(action)
  }

  const fetchServers = async () => {
    try {
      const data = await serverAPI.findServerByGame(props.selectedGame.id);
      setServer(data)
      setLoad(true)
      data.map((d) => {
        setGame(d.nameGame);
      });

    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchServers();
  }, [props.selectedGame.id]);

  const appImages = props.selectedGame.id ? props.selectedGame.id : 0;
    switch (appImages) {
      case "1":
          var appLogo = require('../assets/logos/minecraft-logo.png');
          var backgroundImage = require('../assets/background/minecraft-background.png');
          break;
      case "2":
          var appLogo = require('../assets/logos/hytale-logo.png');
          var backgroundImage = require('../assets/background/hytale-background.png');
          break;
      case "3":
          var appLogo = require('../assets/logos/gtav-logo.png');
          var backgroundImage = require('../assets/background/gtav-background.png');
          break;
      case "4":
          var appLogo = require('../assets/logos/discord-logo.png');
          var backgroundImage = require('../assets/background/discord-background.png');
          break;
      case "5":
          var appLogo = require('../assets/logos/ark-logo.png');
          var backgroundImage = require('../assets/background/ark-background.png');
          break;
      case "6":
          var appLogo = require('../assets/logos/gmod-logo.png');
          var backgroundImage = require('../assets/background/gmod-background.png');
          break;
  };
  
  function detail(servers) {
    if(servers.ip != "") {
      return(
        <View style={styles.bloc1}>
          <View style={styles.ipServer}>
            <Text style={styles.colorWhite}>{servers.ip}</Text>
          </View>
          <View style={styles.serverPlayer}>
              <Text>xx/xxx</Text>
              <Text>Joueurs</Text>
          </View>
        </View>
      )
    } else {
      return(
        <View style={styles.bloc1}>
          <View style={{
             flex: 1,
             backgroundColor: '#EEEEEE',
             alignItems: 'center',
             padding: 15
          }}>
              <Text>xx/xxx Joueurs</Text>
          </View>
        </View>
      )
    }
  }

  function topServer(servers){
    if(servers.length > 1) {
      return(
        <View style={styles.leaderBoard}>
          <Text style={styles.title}>Classement des <Text style={{color: props.selectedGame.gamecolor}}>{servers.length}</Text></Text>
          <Text style={styles.title}>serveurs <Text style={{color: props.selectedGame.gamecolor}}>{game}</Text></Text>
        </View>
      )
    } else {
      return(
        <View style={styles.leaderBoard}>
          <Text style={styles.title}>Classement</Text>
        </View>
      )
    }
  }

    function numberServer(servers){
      if(servers.length > 1) {
        return(
          <Text style={styles.text}>{servers.length} serveurs</Text>
        )
      } else {
        return(
          <Text style={styles.text}>{servers.length} serveur</Text>
        )
      }
    }

    function listServer(servers) {
      if(servers.length > 0){
        return(
            <View style={styles.listServer}>
              {servers.map((servers) => (
              <View style={styles.infoServer} key={servers.id}>
                <View style={styles.banniere}>
                  <TouchableOpacity 
                    onPress={
                      () => combinedFunctions(servers.id)
                  }>
                    <Image source={{uri: 'http://nicolas-camilloni.students-laplateforme.io/assets/miniature_server/'+servers.miniature+'?time=' + new Date() }} style={{height: '100%', borderTopRightRadius: 10, borderTopLeftRadius: 10}}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.description}>
                  <Text style={styles.titleServer}>{servers.name}</Text>
                  <Text style={styles.descriptionText}>{servers.descriptionServer}</Text>
                  {/* Tags */}
                </View>
                <View style={styles.bottomBloc}>
                  {detail(servers)}
                  <View style={styles.detailServer}>
                    <FontAwesome5 name="discord" size={24} color="#6B77C6" />
                    <FontAwesome5 name="chrome" size={24} color="black" />
                  </View>
                  <View style={{
                     height: '25%',
                     backgroundColor: props.selectedGame.gamecolor,
                     borderBottomRightRadius: 10,
                     borderBottomLeftRadius: 10,
                     justifyContent: "center",
                     alignItems: 'center',
                     position: 'relative',
                     bottom: 0,
                  }}>
                    <Text style={styles.vote}>Voter</Text>
                  </View>
                </View>
              </View>
              ))}
            </View>  
        )
      } else {
        return (
          <View style={{width: '100%', alignItems: 'center', marginTop: 80}}>
            <Text style={{color: 'black', fontSize: 18}}>Aucun serveur pour le moment</Text>
          </View>
        )
      }

    }
  
  if(load == true){
    return (
      <ScrollView style={styles.contain}>
          <View style={styles.svgHeader}>
            <ImageBackground source={backgroundImage} style={styles.image}>
                <Svg xmlns="http://www.w3.org/2000/svg" width={40*windowWidth/100} height={40*windowWidth/100} viewBox="0 0 146 146">
                    <G fill="none">
                        <Path d="M73,0A73,73,0,1,1,0,73,73,73,0,0,1,73,0Z" stroke="none"/>
                        <Path fill={props.selectedGame.gamecolor} d="M 73 2 C 63.41417694091797 2 54.11615753173828 3.876937866210938 45.36421966552734 7.578720092773438 C 41.15760040283203 9.357955932617188 37.10015869140625 11.56028747558594 33.30461883544922 14.12449645996094 C 29.54461669921875 16.66470336914063 26.00881958007813 19.58202362060547 22.79541778564453 22.79541778564453 C 19.58202362060547 26.00881958007813 16.66470336914063 29.54461669921875 14.12449645996094 33.30461883544922 C 11.56028747558594 37.10015869140625 9.357955932617188 41.15760040283203 7.578720092773438 45.36421966552734 C 3.876937866210938 54.11615753173828 2 63.41417694091797 2 73 C 2 82.5858154296875 3.876937866210938 91.88383483886719 7.578720092773438 100.6357803344727 C 9.357955932617188 104.842399597168 11.56028747558594 108.8998413085938 14.12449645996094 112.6953811645508 C 16.66470336914063 116.4553833007813 19.58202362060547 119.9911804199219 22.79541778564453 123.2045822143555 C 26.00881958007813 126.4179840087891 29.54461669921875 129.3352966308594 33.30461883544922 131.8755035400391 C 37.10015869140625 134.4397277832031 41.15760040283203 136.6420440673828 45.36421966552734 138.4212799072266 C 54.11615753173828 142.1230621337891 63.41417694091797 144 73 144 C 82.5858154296875 144 91.88383483886719 142.1230621337891 100.6357803344727 138.4212799072266 C 104.842399597168 136.6420440673828 108.8998413085938 134.4397277832031 112.6953811645508 131.8755035400391 C 116.4553833007813 129.3352966308594 119.9911804199219 126.4179840087891 123.2045822143555 123.2045822143555 C 126.4179840087891 119.9911804199219 129.3352966308594 116.4553833007813 131.8755035400391 112.6953811645508 C 134.4397277832031 108.8998413085938 136.6420440673828 104.842399597168 138.4212799072266 100.6357803344727 C 142.1230621337891 91.88383483886719 144 82.5858154296875 144 73 C 144 63.41417694091797 142.1230621337891 54.11615753173828 138.4212799072266 45.36421966552734 C 136.6420440673828 41.15760040283203 134.4397277832031 37.10015869140625 131.8755035400391 33.30461883544922 C 129.3352966308594 29.54461669921875 126.4179840087891 26.00881958007813 123.2045822143555 22.79541778564453 C 119.9911804199219 19.58202362060547 116.4553833007813 16.66470336914063 112.6953811645508 14.12449645996094 C 108.8998413085938 11.56028747558594 104.842399597168 9.357955932617188 100.6357803344727 7.578720092773438 C 91.88383483886719 3.876937866210938 82.5858154296875 2 73 2 M 73 0 C 113.316780090332 0 146 32.68321990966797 146 73 C 146 113.316780090332 113.316780090332 146 73 146 C 32.68321990966797 146 0 113.316780090332 0 73 C 0 32.68321990966797 32.68321990966797 0 73 0 Z" stroke="none"/>
                    </G>
                    <Circle cx="50%" cy="50%" r="65" fill="#fff" opacity="0.50"/>
                    <Img x="25" y="25"  width='94' height='94' href={appLogo}/>                        
                </Svg>
                {numberServer(servers)} 
            </ImageBackground>
          </View>
          <View style={styles.topServer}>
            <MaterialIcons name="leaderboard" size={24} color={props.selectedGame.gamecolor} />
              {topServer(servers)}
            <MaterialIcons name="leaderboard" size={24} color={props.selectedGame.gamecolor} />
          </View>
            {listServer(servers, game)}
      </ScrollView>    
    );
  } else {
    return(
      <View>
        <Loading/>
      </View>
    );
  }
}

// RECUP DU STORE REDUX
const mapStateToProps = ({ selectedGame }) => ({
  selectedGame
});

// STORE SELECTED SERVER TO REDUC
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServersListPage);


const styles = StyleSheet.create({
  contain: {
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#F1F1F1',
  },
  colorWhite: {
    color: 'white',
  },
  topServer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 30,
    maxWidth: 600
  },
  leaderBoard: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: 'center',
  },
  listServer: {
    padding: 30,
    flex: 1,
    marginTop: 25,
  },
  infoServer: {
    marginBottom: 100,
    height: 350,
    backgroundColor: "white",
    borderRadius: 10,
  },
  banniere: {
    width: '100%',
    height: '35%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleServer: {
    fontWeight: "bold",
    fontSize: 22,
  },
  description: {
    marginTop: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '20%'
  },
  descriptionText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  bloc1: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
  },
  ipServer: {
    flex: 2,
    backgroundColor: '#000000',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serverPlayer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
  },
  detailServer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: '#E6E6E6',
    height: '25%',
  },
  // voteServer: {
  //   height: '25%',
  //   backgroundColor: '#26C96D',
  //   borderBottomRightRadius: 10,
  //   borderBottomLeftRadius: 10,
  //   justifyContent: "center",
  //   alignItems: 'center',
  //   position: 'relative',
  //   bottom: 0,
  // },
  vote: {
    color: 'white',
    fontSize: 18,
  },
  bottomBloc: {
    textAlign: 'center',
    height: '50%',
    justifyContent: 'flex-end'
  },
  svgHeader: {
    height: 36.5*windowHeight/100,
  },
  text: {
      width: '100%',
      textAlign: 'center',
      color: "white",
      fontSize: 7*windowWidth/100,
      fontFamily: 'HomepageBaukasten',
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? '10%' : '5%',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 4,
  },
  image: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
  },
});