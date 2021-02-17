import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Platform, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import FormsHero from '../components/FormsHero';
import TextInput from '../components/TextInput';
import Bouton from '../components/bouton';
import Carousel from 'react-native-snap-carousel';
import GamesAPI from "../services/gamesAPI";
import serverAPI from '../services/serverAPI.js'
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Formik } from "formik";
import Topbar from '../components/Topbar';
import Loading from '../components/loading';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserServerPage = (props) => {

    const { route, navigation } = props;
    const {idUser} = route.params;
    const [userServer, setUserServer] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [response, setResponse] = useState([]);
    const [idServer, setIdServer] = useState([]);
    const [load, setLoad] = useState(false);

   
    const fetchServers = async () => {
        try {
            const data = await serverAPI.findServerByUser(idUser);
            setUserServer(data)
            setLoad(true)
        } catch (error) {
            console.log(error);
            console.log("nope");
        }
    };

    useEffect(() => {
            fetchServers();
        }, [route]
    );

    const handleOnSubmitSupp = async (values, actions) => {
    
        const donnees = new URLSearchParams();
        donnees.append("password", values.password);

        try {
          const data = await serverAPI.deleteServer(donnees, idServer);
        
            if (typeof data == "object") {
                data.map((d) => {
                setResponse(d.password_error);
                });
            } else {
                setResponse(data);
                setModalVisible(false)
                fetchServers()
            }
        } catch (error) {
                setResponse(error);
            }

            if (props.serversRedux.info != null) {
                props.serversRedux.info.map((s) => {
                    if(serverId == s.id){
                        const action = { type: "UPDATE_SERVERS", value: {info: props.serversRedux.info, isUpdated: true} }
                        props.dispatch(action)
                    }
                });
            }
        };

    function myServer(userServer){
        if(userServer.length > 0) {
            return (
                <View style={styles.listMyserver}>
                    {userServer.map((userServer) => {
                        return (
                            <View key={userServer.id} style={{ 
                                    marginBottom: 68, 
                                    alignItems: 'center',
                                    borderRadius: 12,
                                    height: 280,
                                    backgroundColor: 'white',
                                    borderColor: userServer.color,
                                    borderWidth: 2
                                }}>
                                <View style={styles.miniature}>
                                    <ImageBackground
                                    source={{ uri: 'http://nicolas-camilloni.students-laplateforme.io/assets/miniature_server/'+userServer.miniature+'?time=' + new Date() }}
                                    style={{width: '100%', height: '100%'}}
                                    imageStyle={{resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                    />
                                </View>
                                <View style={{width: '100%', alignItems:'center', justifyContent: 'center', height: '30%', backgroundColor: props.apparence.dark ? '#242048' : 'white'}}>
                                    <Text style={{fontSize: 22, fontWeight: 'bold', color: props.apparence.dark ? 'white' : 'black'}}>{userServer.name}</Text>
                                    <Text style={{fontSize: 14, color: userServer.color}}>{userServer.nameGame}</Text>
                                </View>
                                <View style={styles.infoServer}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor: userServer.color, padding: 5}}>
                                        <View style={{alignItems: 'center'}}>
                                            <AntDesign name="like2" size={16} color="white" />
                                            <Text style={styles.detailServer}>{userServer.vote} Vote(s)</Text>
                                        </View>
                                        <View style={{alignItems: 'center'}}>
                                        <FontAwesome name="comment-o" size={16} color="white" />
                                            <Text style={styles.detailServer}>{userServer.avis} Avi(s)</Text>
                                        </View>
                                        <View style={{alignItems: 'center'}}>
                                            <MaterialCommunityIcons name="cursor-default-outline" size={16} color="white" />
                                            <Text style={styles.detailServer}>Click(s)</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: 5}}>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() =>{
                                                navigation.navigate('ProfilePage', {
                                                    screen: 'UpdateServerPage',
                                                    params: {serverId: userServer.id}
                                                    })
                                                }}
                                            >
                                                <View style={{alignItems: 'center'}}>
                                                    <FontAwesome name="pencil-square-o" size={24} color="#6B77C6" />
                                                    <Text style={{color: 'white'}}>Modifier</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => {setIdServer(userServer.id), setModalVisible(true);}}
                                            >
                                                <View style={{alignItems: 'center'}}>
                                                    <AntDesign name="delete" size={24} color="#CD3538" />
                                                    <Text style={{color: 'white'}}>Supprimer</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            )
        } else {
            return (
                <View style={styles.listMyserver}>
                    <Text style={{textAlign: 'center', color: 'black', fontSize: 20}}>Vous n'avez aucun serveur</Text>
                </View>
            )
        }
    }

    if(load == true){
        return(
            <ScrollView style={{
                backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
            }}>
                <Topbar color={props.apparence.dark ? 'white' : '#262626'} title="Mes serveurs" isText={true} navigation={navigation} backgroundColor={props.apparence.dark ? '#080015' : 'white'} />
                    {myServer(userServer)}
                <Modal animationType="slide" transparent={true} visible={modalVisible} style={{
                    borderRadius: 20,
                }}>
                    <View style={styles.centeredView}>
                        <View style={{
                            borderRadius: 20,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            width: windowWidth - 50,
                            backgroundColor: props.apparence.dark ? '#141229' : 'white',
                        }}>
                            <Text style={{
                                marginBottom: 15,
                                textAlign: "center",
                                fontSize: 22,
                                backgroundColor: props.apparence.dark ? '#242048' : '#F3F3F3',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                width: "100%",
                                paddingTop: 10,
                                paddingBottom: 10,
                                color: props.apparence.dark ? 'white' : '#262626',
                            }}>Supprimer le serveur</Text>
                            <Text style={{
                                textAlign: "center",
                                width: "90%",
                                fontSize: 16,
                                color: props.apparence.dark ? 'white' : 'black',
                            }}>
                            Etes-vous sûr(e) de vouloir supprimer votre serveur ?
                            </Text>
                            <Text style={styles.modalInfos}>
                            Cette action supprimera immédiatement votre serveur et
                            vous ne pourrez plus revenir en arrière.
                            </Text>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        password: "",
                                    }}
                                    onSubmit={handleOnSubmitSupp}
                                    >
                                    {(formikprops) => (
                                    <View style={{ width: "100%", alignItems: "center" }}>
                                    <TextInput
                                        style={{
                                        height: 40,
                                        borderColor: props.apparence.dark ? '#242048' : 'white',
                                        borderWidth: 2,
                                        width: '80%',
                                        fontSize: 18,
                                        marginBottom: 15,
                                        }}
                                        secureTextEntry={true}
                                        placeholder="Mot de passe"
                                        onChangeText={formikprops.handleChange('password')}
                                        value={formikprops.values.password}
                                        icon='lock'
                                        type='password'
                                        error={response}
                                    />
                                    <View style={styles.fixToText}>
                                    <TouchableOpacity
                                        style={{
                                            width: "50%",
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            backgroundColor: props.apparence.dark ? '#242048' : 'white',
                                            borderBottomLeftRadius: 20,
                                        }}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            setResponse();
                                        }}
                                        >
                                        <Text style={{
                                            textAlign: "center",
                                            color: props.apparence.dark ? 'white' : 'black',
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            paddingLeft: 20,
                                        }}>Annuler</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        style={{
                                            width: "50%",
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            backgroundColor: props.apparence.dark ? '#242048' : 'white',
                                            borderBottomRightRadius: 20,
                                        }}
                                        onPress={formikprops.handleSubmit}
                                        >
                                        <Text style={styles.buttonTextRight}>Supprimer</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            </Formik>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    } else {
        return(
            <ScrollView style={{
                backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
            }}>
                <Topbar color={props.apparence.dark ? 'white' : '#262626'} title="Mes serveurs" isText={true} navigation={navigation} backgroundColor={props.apparence.dark ? '#080015' : 'white'} />
                <Loading/>
            </ScrollView>
        )
    }
}

// RECUP DU STORE REDUX
const mapStateToProps = ({ serversRedux, apparence, }) => ({
    serversRedux,
    apparence,
});

// STORE SELECTED SERVER TO REDUX
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(UserServerPage);
  
const styles = StyleSheet.create({
    namePage: {
        backgroundColor: 'white',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listMyserver: {
        height: '100%',
        padding: 10,
        marginTop: 34,
    },
    miniature: {
        width: '100%',
        height: '35%',
        // borderWidth: 3,
        // borderColor: '#262626',
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10
    },
    infoServer: {
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#262626',
        height: '35%',
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
        position: 'absolute',
        bottom: 0
    },
    detailServer: {
        color: 'white',
        fontSize: 12
    },
    centeredView: {
        borderRadius: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalTitle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 15,
        textAlign: "center",
        fontSize: 22,
        backgroundColor: "#F3F3F3",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
      },
    modalContent: {
        textAlign: "center",
        width: "90%",
        fontSize: 16,
    },
    modalInfos: {
        textAlign: "center",
        width: "90%",
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        color: "#D67777",
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F3F3F3",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        width: "100%",
    },
    buttonTextRight: {
        textAlign: "center",
        color: "coral",
        fontSize: 20,
        fontWeight: "bold",
        paddingRight: 20,
    },
    errors: {
        color: "red",
        textAlign: "center",
        fontSize: 12,
        marginBottom: 10,
    },
})