import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';
import Svg, { Path, Rect} from 'react-native-svg';
import serverAPI from '../services/serverAPI.js'
import { Formik } from "formik";


const ServerInfoPage = (props) => {
    
    const [feedBackUser, setFeedBackUser] = useState(0);
    const [response, setResponse] = useState([]);

    var getElement = (numberStarId) => e => { 
        setFeedBackUser(numberStarId+1)
    }

    const handleOnSubmit = async (values, actions) => {
        const donnees = new URLSearchParams();
        donnees.append("comment",values.comment);
        donnees.append("servers_fk", id);
        donnees.append("score", feedBackUser);
        // donnees.append("date", '2021-01-15 10:00:00');
        
        try {
            const data = await serverAPI.postComment(donnees);
            if (typeof data == "object") {
              data.map((d) => {
                setResponse(d);
              });
            } else {
              setResponse(data);
              actions.resetForm();
            }
          } catch (error) {
            setResponse(error);
          }
    };

    const [server, setServer] = useState([]);
    const fetchServers = async () => {
        try {
        const data = await serverAPI.findServerByID();
        setServer(data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        fetchServers();
    }, []);

    // Tableau de notes
    const notes = [];
    const comment = [];
    var addition = 0;
    var descriptionServer;
    var vote;
    var color;
    var numberOfMaxStar = 5;

  {server.map((server) => (
    notes.push(
        server.score
    ),
    comment.push(
        server.comment
    ),
    id = server.id,
    descriptionServer = server.descriptionServer,
    vote = server.vote,
    color = server.color
  ))}

 
  for (const [index, value] of notes.entries()) {
    addition = addition + parseInt(value)
  }
    // Moyenne des notes + arrondi
    const moyenne = addition / notes.length;
    const note = Math.round(moyenne);


    // Number of star
    const numberStar = (values) => {

        var scoreByUser = [];
            for (var i = 0; i < values; i++) {
                scoreByUser.push(
                    {'svg' :
                    <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="35">
                        <Path fill={color} d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </Svg>})
            }
            if (values < numberOfMaxStar) {
                for (var j = 0; j < numberOfMaxStar - values; j++) {
                    scoreByUser.push(
                    {'svg' :
                    <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="35">
                        <Path fill="#757F80" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </Svg>})
                }
            }
        return scoreByUser
    }
    
    return(
        <ScrollView style={styles.contain}>
            <View style={styles.server}>
                <View style={styles.svgHeader}>
                    <ImageBackground source={require("../assets/Minecraft_infoServer.png")} style={styles.image}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <Rect width="100%" height="100%" fill="black" opacity="0.43"/>
                        </Svg>
                        <View style={styles.header}>
                            <Image source={require('../assets/banniere_server.jpg')} style={styles.miniature}/>
                            <Text style={styles.titleServer}>One Piece Minecraft</Text>
                            <View style={styles.note}>
                                {numberStar(note).map((numberStar, key) => (
                                    <Text key={key}>{numberStar.svg}</Text> 
                                    
                                ))} 
                            </View> 
                        </View>
                    </ImageBackground>
                </View>
            </View>
            <View style={styles.infoServer}>
                <View style={styles.titleInfo}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 35 24">
                        <Path fill={color} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/>
                    </Svg>
                    <Text style={styles.titleSize}>
                        A propos du serveur
                    </Text>
                </View>
                <View style={styles.descriptionServer}>
                    <Text style={styles.textSize}>{descriptionServer}</Text>
                </View>
            </View>
            <View style={styles.statsServer}>
                <View style={styles.titleInfo}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 35 24">
                        <Path fill={color} d="M5 20v2h-2v-2h2zm2-2h-6v6h6v-6zm6-1v5h-2v-5h2zm2-2h-6v9h6v-9zm6-2v9h-2v-9h2zm2-2h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"/>
                    </Svg>
                    <Text style={styles.titleSize}>
                        Statistiques
                    </Text>
                </View>
                <View style={styles.stats}>
                    <View style={styles.cards}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
                            <Path fill={color} d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z"/>
                        </Svg>
                        <Text style={styles.data}>{vote}</Text>
                        <Text style={{ color: color, fontSize: 22, fontWeight: 'bold' }}>Votes</Text>
                    </View>
                    <View style={styles.cards}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
                            <Path fill={color} d="M12.849 24l-3.96-7.853-4.889 4.142v-20.289l16 12.875-6.192 1.038 3.901 7.696-4.86 2.391zm-3.299-10.979l4.194 8.3 1.264-.617-4.213-8.313 4.632-.749-9.427-7.559v11.984l3.55-3.046z"/>
                        </Svg>
                        <Text style={styles.data}></Text>
                        <Text style={{ color: color, fontSize: 22, fontWeight: 'bold' }}>Clics</Text>
                    </View>
                    <View style={styles.cards}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
                            <Path fill={color} d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"/>
                        </Svg>
                        <Text style={styles.data}>{comment.length}</Text>
                        <Text style={{ color: color, fontSize: 22, fontWeight: 'bold' }}>Avis</Text>
                    </View>
                </View>
                <View style={styles.comment}>
                    <View style={styles.titleInfo}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 35 24">
                            <Path fill={color} d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"/>
                        </Svg>
                        <Text style={styles.titleComment}>
                            Avis
                        </Text>
                    </View>
                    <View>
                        {server.map((server, key) => (
                            <View key={key} style={styles.infoUser}>
                                <Text style={styles.login}>{server.login}</Text>
                                <Text style={styles.date}>{server.date}</Text>
                                <Text style={styles.score}>
                                {numberStar(server.score).map((numberStar, key) => (
                                    <Text key={key}>{numberStar.svg}</Text> 
                                ))}   
                                </Text> 
                                <Text style={styles.commentUser}>{server.comment}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Si user connecté */}
                    <View style={styles.feedback}>
                        <Text style={{color: color, fontWeight: 'bold', fontSize: 18, marginTop: 30}}>Je laisse mon commentaire</Text>
                        <View style={styles.feedbackStar}>
                            <Text style={{color: 'white', fontSize: 16}}>Noter ce serveur : </Text>
                            <Text>
                                {numberStar(feedBackUser).map((numberStar, key) => (
                                    <TouchableOpacity 
                                    key={key}
                                    onPress={getElement(key)}
                                    >
                                    {numberStar.svg}
                                    </TouchableOpacity>
                                ))}
                            </Text>
                        </View>
                        <Formik
                        initialValues={{ comment: "" }}
                        onSubmit={handleOnSubmit}
                        >
                            {(formikprops) => (
                               
                            <View style={styles.form}>
                                <TextInput 
                                    style={styles.feddbackComent}
                                    onChangeText={formikprops.handleChange("comment")}
                                    value={formikprops.values.comment}
                                    placeholder="Commentaire..."
                                    placeholderTextColor="grey"
                                    numberOfLines={15}
                                    multiline={true}
                                    color= 'white'
                                    textAlignVertical='top'
                                />
                                <Button 
                                    style={styles.button} 
                                    onPress="" 
                                    title="Commenter"
                                    color= {color}
                                    onPress={formikprops.handleSubmit}
                                />
                            </View>
                        )}
                        </Formik>
                    </View>
                    {/* Si user connecté */}
                </View>
            </View>
        </ScrollView>
    )
}

export default ServerInfoPage

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#F1F1F1',
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
        height: 368,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    miniature: {
        height: 96,
        width: '80%',
        maxWidth: 500,
        borderRadius: 5,
    },
    header: {
        width: "100%",
        position: 'absolute',
        top: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleServer: {
        color: "white",
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    note: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 5,
    },
    infoServer: {
        width: '100%',
        minHeight: 150,
    },
    titleInfo: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSize: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
    },
    descriptionServer: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stats: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    cards: {
        marginBottom: 30,
        width: '80%',
        maxWidth: 600,
        backgroundColor: 'white',
        height: 215,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    data: {
        fontSize: 22,
        marginTop: 5,
    },
    comment: {
        backgroundColor: '#040404',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleComment: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    login: {
        marginTop: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    date: {
        marginTop: 10,
        color: '#757575',
    },
    score: {
        marginTop: 10,
        color: 'white',
    },
    commentUser: {
        marginTop: 10,
        marginBottom: 20,
        color: 'white',
        fontSize: 16,
    },
    infoUser: {
        width: '100%',
        alignItems: 'center',
        borderBottomColor: '#353535',
        borderBottomWidth: 1,
    },
    feedbackStar: {
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    feedback: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    feddbackComent: {
        marginTop: 20,
        width: '80%',
        maxWidth: 600,
        height: 150,
        backgroundColor: '#3A3737',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    textSize: {
        fontSize: 16,
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    }
})
