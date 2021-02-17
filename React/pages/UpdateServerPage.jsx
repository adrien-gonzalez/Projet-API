import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Platform, ImageBackground, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import Bouton from '../components/bouton';
import Carousel from 'react-native-snap-carousel';
import GamesAPI from "../services/gamesAPI";
import serverAPI from '../services/serverAPI.js'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import { Formik } from "formik";
import { connect } from 'react-redux';
import Topbar from '../components/Topbar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.25);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const UpdateServerPage = (props) => {

    const { route, navigation } = props
    
    var _carousel = React.createRef()
    const {serverId} = route.params;
    const [response, setResponse] = useState([]);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [nameError, setNameError] = useState([]);
    const [descriptionError, setDescriptionError] = useState([]);

   
    const handleOnSubmit = async (values, actions) => {
        var gameId = parseInt(JSON.stringify(_carousel.current.currentIndex)) + 1

        setNameError('')
        setDescriptionError('')

        if(values.nameServer == "") {
            setNameError("Veuillez renseigner un nom de serveur")
        }
        if(values.description == "") {
            setDescriptionError("Veuillez renseigner une description")
        }

        let formData = new FormData();
        
        if(selectedImage != null) {
            let imageBody = {
                uri: selectedImage.localUri,
                name: selectedImage.localUri,
                type: 'image/jpeg',
            };
            formData.append('file', (imageBody)) 
        }
        
        formData.append("name", values.nameServer);
        formData.append("ip", values.ip);
        formData.append("port", values.port);
        formData.append("description", values.description);
        formData.append("website", values.webSite);
        formData.append("discord", values.discord);
        formData.append("gameId", gameId);


        try {
            const data = await serverAPI.updateServer(formData, serverId);
           
            if (typeof data == "object") {
            } else {
                setResponse(data);
                actions.resetForm();
                navigation.navigate('ProfilePage', {
                    screen: 'UserServerPage',
                });
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
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();    
        
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4.00, 1],
            quality: 0.5,
        });

        if (pickerResult.cancelled === true) {
          return;
        }

        setSelectedImage({localUri: pickerResult.uri });
    };

    const [games, setGames] = useState([]);
    console.log(games)
    const fetchGames = async () => {
        try {
            const data = await GamesAPI.findAllForCarousel();
            setGames(data);
        } catch (error) {
            console.log(error);
            console.log("nope");
        }
    };

    const [serverInfo, setServerInfo] = useState([]);
    const fetchServers = async () => {
        try {
            const data = await serverAPI.findServerByID(serverId);
            data.map((serverInfo) => {
                setServerInfo({
                    id : serverInfo.id,
                    descriptionServer : serverInfo.descriptionServer,
                    color : serverInfo.color,
                    games_fk : serverInfo.games_fk,
                    ip : serverInfo.ip,
                    port : serverInfo.port,
                    discord : serverInfo.discord,
                    website : serverInfo.website,
                    name : serverInfo.name,
                    miniature : serverInfo.miniature
                })
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGames();
        fetchServers();
        }, []
    );

    function image (selectedImage){
        if (selectedImage !== null) {
            return (
            <View style={styles.imageServer}>
                <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.thumbnail}
                />
            </View>
            );
        } else {
            return (
            <View style={styles.imageServer}>
            <Image
                source={{ uri: 'http://nicolas-camilloni.students-laplateforme.io/assets/miniature_server/'+serverInfo.miniature+'?time=' + new Date() }}
                style={styles.thumbnail}
                />
            </View>
            );
        }
    }

    const _renderItem = ({item,index}) => {
        return (
            <View style={{
                backgroundColor: games[index].color,
                borderColor: 'white',
                borderWidth: 3,
                borderRadius: 50,
                height: Platform.OS === 'ios' ? 90 : 80,
                width: Platform.OS === 'ios' ? 90 : 80,
                marginLeft: 10,
                marginRight: 25,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ImageBackground source={{uri: 'http://nicolas-camilloni.students-laplateforme.io/assets/'+games[index].logo+'?time=' + new Date()}} style={{width: Platform.OS === 'ios' ? 60 : 50, height: Platform.OS === 'ios' ? 60 : 50}}/>
            </View>
        )
    }
   
    if (Platform.OS === "ios") {
        return (
          <KeyboardAvoidingView
            style={{ width: "100%" }}
            keyboardVerticalOffset={0}
            behavior={"position"}
          >
            <View style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
            }}>
                <View style={styles.headerContainer}>
                    <FormsHero navigation={navigation} title="Modifier un serveur" backArrow={true} needBar={true} />
                </View>

                <ScrollView style={{height: '60%'}}>
                <Text style={{
                    textAlign: 'center', 
                    fontSize: Platform.OS === 'ios' ? 18: 15, 
                    marginBottom: 10, 
                    color: props.apparence.dark ? 'white' : '#545453',
                    fontFamily: 'TwCent',
                    textTransform: 'uppercase',
                    letterSpacing: 2.5,
                    opacity: props.apparence.dark ? 1 : 0.65,
                }}>Type de serveur</Text>
                <SafeAreaView style={{height: ITEM_HEIGHT*1.2}}>
                        <View style={{ width: '100%',flex: 1, flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                            <Carousel
                            ref={_carousel}
                            layout={"default"}
                            activeSlideAlignment={"center"}
                            data={games}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            renderItem={_renderItem}  
                            inactiveSlideScale={0.45}
                            inactiveSlideOpacity= {0.25}
                            firstItem={parseInt(serverInfo.games_fk)-1}
                        />
                        </View>
                    </SafeAreaView>
                    <Formik
                        enableReinitialize
                        initialValues={{ description: serverInfo.descriptionServer, nameServer: serverInfo.name, 
                        ip: serverInfo.ip, port: serverInfo.port, webSite: serverInfo.website, discord: serverInfo.discord}}
                        onSubmit={handleOnSubmit}
                        >
                        {(formikprops) => (
                        <View style={styles.formContainer}>
                            <InputText 
                                placeholder="Nom du serveur" 
                                icon="pen" 
                                color="#66A5F9" 
                                onChangeText={formikprops.handleChange("nameServer")}
                                value={formikprops.values.nameServer}  
                                error={nameError}  
                            />
                            <InputText 
                                placeholder="Adresse IP (optionnel)" 
                                icon="server" 
                                color="#66A5F9" 
                                onChangeText={formikprops.handleChange("ip")}
                                value={formikprops.values.ip} 
                            />
                            <InputText 
                                placeholder="Port (optionnel)" 
                                icon="plug" 
                                color="#66A5F9" 
                                onChangeText={formikprops.handleChange("port")}
                                value={formikprops.values.port} 
                            />
                            <InputText 
                                placeholder="Description" 
                                icon="" 
                                color="#66A5F9"
                                height= {400}
                                textAlignVertical='top'
                                numberOfLines={40}
                                multiline={true} 
                                onChangeText={formikprops.handleChange("description")}
                                value={formikprops.values.description}  
                                error={descriptionError}  
                            />
                            <InputText 
                                placeholder="Site web (optionnel)" 
                                icon="chrome" 
                                color="#66A5F9" 
                                onChangeText={formikprops.handleChange("webSite")}
                                value={formikprops.values.webSite}   
                            />
                            <InputText 
                                placeholder="Discord (optionnel)" 
                                icon="discord" 
                                color="#66A5F9" 
                                onChangeText={formikprops.handleChange("discord")}
                                value={formikprops.values.discord} 
                            />
                            <TouchableOpacity onPress={openImagePickerAsync} style={{
                                borderRadius: 20,
                                height: 14*windowWidth/100,
                                paddingLeft: 18,
                                paddingRight: 18,
                                width: 80*windowWidth/100,
                                backgroundColor: props.apparence.dark ? '#190042' : 'white',
                                marginBottom: 34,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                                <FontAwesome name="upload" size={20} color = '#A1A1A1'/>
                                <Text style={{fontSize: 16 ,color: props.apparence.dark ? 'white' : '#6A6A6A', fontWeight: 'bold'}}>Image serveur</Text>
                                {image(selectedImage)}
                            </TouchableOpacity>
                            <Bouton onPress={formikprops.handleSubmit} title="Modifier" />
                        </View>
                    )}
                    </Formik>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
        )
    } else {
        return (
            <View style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: props.apparence.dark ? '#141229' : '#F1F1F1',
            }}>
            <View style={styles.headerContainer}>
                <FormsHero navigation={navigation} title="Modifier un serveur" backArrow={true} needBar={true} />
            </View>

            <ScrollView style={{height: '60%'}}>
            <Text style={{
                textAlign: 'center', 
                fontSize: Platform.OS === 'ios' ? 18: 15, 
                marginBottom: 10, 
                color: props.apparence.dark ? 'white' : '#545453',
                fontFamily: 'TwCent',
                textTransform: 'uppercase',
                letterSpacing: 2.5,
                opacity: props.apparence.dark ? 1 : 0.65,
            }}>Type de serveur</Text>
            <SafeAreaView style={{height: ITEM_HEIGHT*1.2}}>
                    <View style={{ width: '100%',flex: 1, flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                        <Carousel
                        ref={_carousel}
                        layout={"default"}
                        activeSlideAlignment={"center"}
                        data={games}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        renderItem={_renderItem}  
                        inactiveSlideScale={0.45}
                        inactiveSlideOpacity= {0.25}
                        firstItem={parseInt(serverInfo.games_fk)-1}
                    />
                    </View>
                </SafeAreaView>
                <Formik
                    enableReinitialize
                    initialValues={{ description: serverInfo.descriptionServer, nameServer: serverInfo.name, 
                    ip: serverInfo.ip, port: serverInfo.port, webSite: serverInfo.website, discord: serverInfo.discord}}
                    onSubmit={handleOnSubmit}
                    >
                    {(formikprops) => (
                    <View style={styles.formContainer}>
                        <InputText 
                            placeholder="Nom du serveur" 
                            icon="pen" 
                            color="#66A5F9" 
                            onChangeText={formikprops.handleChange("nameServer")}
                            value={formikprops.values.nameServer}  
                            error={nameError}  
                        />
                        <InputText 
                            placeholder="Adresse IP (optionnel)" 
                            icon="server" 
                            color="#66A5F9" 
                            onChangeText={formikprops.handleChange("ip")}
                            value={formikprops.values.ip} 
                        />
                        <InputText 
                            placeholder="Port (optionnel)" 
                            icon="plug" 
                            color="#66A5F9" 
                            onChangeText={formikprops.handleChange("port")}
                            value={formikprops.values.port} 
                        />
                        <InputText 
                            placeholder="Description" 
                            icon="" 
                            color="#66A5F9"
                            height= {400}
                            textAlignVertical='top'
                            numberOfLines={40}
                            multiline={true} 
                            onChangeText={formikprops.handleChange("description")}
                            value={formikprops.values.description}  
                            error={descriptionError}  
                        />
                        <InputText 
                            placeholder="Site web (optionnel)" 
                            icon="chrome" 
                            color="#66A5F9" 
                            onChangeText={formikprops.handleChange("webSite")}
                            value={formikprops.values.webSite}   
                        />
                        <InputText 
                            placeholder="Discord (optionnel)" 
                            icon="discord" 
                            color="#66A5F9" 
                            onChangeText={formikprops.handleChange("discord")}
                            value={formikprops.values.discord} 
                        />
                        <TouchableOpacity onPress={openImagePickerAsync} style={{
                            borderRadius: 20,
                            height: 14*windowWidth/100,
                            paddingLeft: 18,
                            paddingRight: 18,
                            width: 80*windowWidth/100,
                            backgroundColor: props.apparence.dark ? '#190042' : 'white',
                            marginBottom: 34,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>
                            <FontAwesome name="upload" size={20} color = '#A1A1A1'/>
                            <Text style={{fontSize: 16 ,color: props.apparence.dark ? 'white' : '#6A6A6A', fontWeight: 'bold'}}>Image serveur</Text>
                            {image(selectedImage)}
                        </TouchableOpacity>
                        <Bouton onPress={formikprops.handleSubmit} title="Modifier" />
                    </View>
                )}
                </Formik>
            </ScrollView>
        </View>
        )
    }
}

// STORE SELECTED SERVER TO REDUX
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

// RECUP DU STORE REDUX
const mapStateToProps = ({ selectedServer, selectedGame, apparence, serversRedux, }) => ({
    selectedServer,
    selectedGame,
    apparence,
    serversRedux,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateServerPage);

const styles = StyleSheet.create({
    headerContainer: {
        height: '40%',
    },
    formContainer: {
        paddingTop: '6%',
        width: windowWidth,
        height: '100%',
        alignItems: 'center',
        paddingBottom: '14%'
    },
    imageServer: {
        width:  50,
        height: 14*windowWidth/100,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        borderRadius: 10
    },
});

