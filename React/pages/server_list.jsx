import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Header from '../components/header.js'
import serverAPI from '../services/server.js'


const ServerByGame = (props) => {

  const [servers, setServer] = useState([]);
  const fetchServers = async () => {
    try {
      const data = await serverAPI.findServerByGame();
      setServer(data);
    } catch (error) {
      console.log(error);
      console.log("nope");
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);
  console.log(servers);

  return (
    <View style={styles.contain}>
      <View style={styles.server}>
        <Header/>
      </View>
      <View>
        <Text  style={styles.title}>Serveurs à l'affiche</Text>
      </View>
        <View style={styles.listServer}>
          {servers.map((servers) => (
          <View style={styles.infoServer}>
            {/* Requete API bannière serveur */}
            <Image source={require('../assets/banniere_server.jpg')} style={styles.banniere}/>
            {/* Requête API Titre serveur */}
            <View style={styles.description}>
              <Text style={styles.titleServer}>{servers.name}</Text>
              {/* Requête API Notes (étoiles) */}
              {/* <Text style={styles.noteServer}></Text> */}

              {/* Requête API description server */}
              <Text style={styles.descriptionText}>{servers.descriptionServer}</Text>
              {/* Tags */}
            </View>
            <View style={styles.bottomBloc}>
              <View style={styles.bloc1}>
                <View style={styles.ipServer}>
                  {/* Requête API IP */}
                  <Text style={styles.colorWhite}>{servers.ip}</Text>
                </View>
                <View style={styles.serverPlayer}>
                    <Text>xx/xxx</Text>
                    <Text>Joueurs</Text>
                </View>
              </View>
              <View style={styles.detailServer}>
                <Text>discord</Text>
                <Text>crack</Text>
                <Text>version</Text>
                <Text>Site</Text>
              </View>
              <View style={styles.voteServer}>
                <Text style={styles.vote}>Voter</Text>
              </View>
            </View>
        </View>
        ))}
        {/* <StatusBar style="auto" /> */}
      </View>  
    </View>    
  );
}

export default ServerByGame;


const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    width: '100%',
  },
  colorWhite: {
    color: 'white',
  },
  server: {
    height: 250,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 50,
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
    height: 130,
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
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: '#E6E6E6',
  },
  voteServer: {
    height: 50,
    backgroundColor: '#26C96D',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  vote: {
    color: 'white',
    fontSize: 18,
  },
  bottomBloc: {
    textAlign: 'center',
  }
});