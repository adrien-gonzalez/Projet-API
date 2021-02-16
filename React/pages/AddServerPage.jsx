import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Platform, ImageBackground, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import Bouton from '../components/bouton';
import Carousel from 'react-native-snap-carousel';
import GamesAPI from "../services/gamesAPI";
import userAPI from '../services/userAPI.js'
import serverAPI from '../services/serverAPI.js'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

import { useRef } from "react";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.25);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);


const AddServerPage = ({navigation}) => {

    const scrollRef = useRef();
    
    const [idUser, setId] = useState([]);

    SecureStore.getItemAsync("token").then(result => {
      const {id} = jwtDecode(result);
      setId(id);
    });

    var _carousel = React.createRef()
    const [response, setResponse] = useState([]);
    const [nameError, setNameError] = useState([]);
    const [descriptionError, setDescriptionError] = useState([]);
    const [miniatureError, setMiniatureError] = useState([]);

    const [selectedImage, setSelectedImage] = React.useState(null);
    const handleOnSubmit = async (values, actions) => {
        var gameId = parseInt(JSON.stringify(_carousel.current.currentIndex)) + 1

        setNameError('')
        setDescriptionError('')
        setMiniatureError('')

        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    
        if(values.nameServer == "") {
            setNameError("Veuillez renseigner un nom de serveur")
        }
        if(values.description == "") {
            setDescriptionError("Veuillez renseigner une description")
        }
        if(selectedImage == null) {
            setMiniatureError("Veuillez renseigner une miniature")
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
            const data = await serverAPI.createServer(formData);
            if (typeof data == "object") {
                data.map((d) => {
                    setNameError(d.nameAlreadyExist)
                  });
            } else {
              setResponse(data);
              setSelectedImage(null)
              actions.resetForm();
              navigation.navigate('ProfilePage', {
                screen: 'UserServerPage',
                params: { idUser: idUser },
             });
            }
          } catch (error) {
                setResponse(error);
          }
    }
console.log(nameError)

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
    
        setSelectedImage({ localUri: pickerResult.uri });
    };

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
        }
    }
    
    const [games, setGames] = useState([]);
    const fetchGames = async () => {
    try {
        const data = await GamesAPI.findAllForCarousel();
        setGames(data);
    } catch (error) {
        console.log(error);
        console.log("nope");
    }
    };

    useEffect(() => {
    fetchGames();
    }, []
    );

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
            <View style={styles.createServerPageContainer}>
                <View style={styles.headerContainer}>
                    <FormsHero title="Ajouter un serveur" />
                </View>

                <ScrollView ref={scrollRef} style={{height: '60%'}}>
                <Text style={styles.serverType}>Type de serveur</Text>
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
                            firstItem={Math.round(games.length / 2)}
                        />
                        </View>
                    </SafeAreaView>
                    <Formik
                        initialValues={{ description: "", nameServer: "", ip: "", port: "", webSite: "", discord: ""}}
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
                            <TouchableOpacity onPress={openImagePickerAsync} style={styles.input}>
                                <FontAwesome name="upload" size={20} color = '#A1A1A1'/>
                                <Text style={{fontSize: 16 ,color: '#6A6A6A', fontWeight: 'bold'}}>Image serveur</Text>
                                {image(selectedImage)}
                            </TouchableOpacity>
                            <Text style={styles.error}>{miniatureError}</Text>
                            <Bouton onPress={formikprops.handleSubmit} title="Ajouter un serveur" />
                        </View>
                    )}
                    </Formik>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
        );
    } else {
        return(
            <View style={styles.createServerPageContainer}>
                <View style={styles.headerContainer}>
                    <FormsHero title="Ajouter un serveur" needBar={false}/>
                </View>

                <ScrollView ref={scrollRef} style={{height: '60%'}}>
                <Text style={styles.serverType}>Type de serveur</Text>
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
                            firstItem={Math.round(games.length / 2)}
                        />
                        </View>
                    </SafeAreaView>
                    <Formik
                        initialValues={{ description: "", nameServer: "", ip: "", port: "", webSite: "", discord: ""}}
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
                            <TouchableOpacity onPress={openImagePickerAsync} style={styles.input}>
                                <FontAwesome name="upload" size={20} color = '#A1A1A1'/>
                                <Text style={{fontSize: 16 ,color: '#6A6A6A', fontWeight: 'bold'}}>Image serveur</Text>
                                {image(selectedImage)}
                            </TouchableOpacity>
                            <Text style={styles.error}>{miniatureError}</Text>
                            <Bouton onPress={formikprops.handleSubmit} title="Ajouter un serveur" />
                        </View>
                    )}
                    </Formik>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: '40%',
    },
    createServerPageContainer: {
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#F1F1F1',
    },
    formContainer: {
        paddingTop: '6%',
        width: windowWidth,
        height: '100%',
        alignItems: 'center',
        paddingBottom: '14%'
    },
    serverType: {
        textAlign: 'center', 
        fontSize: Platform.OS === 'ios' ? 18: 15, 
        marginBottom: 10, 
        color: '#545453',
        fontFamily: 'TwCent',
        textTransform: 'uppercase',
        letterSpacing: 2.5,
        opacity: 0.65
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
    input: {
        borderRadius: 20,
        height: 14*windowWidth/100,
        padding : 34,
        paddingLeft: 18,
        width: 80*windowWidth/100,
        backgroundColor:"white",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 34,
        marginBottom: 34

      },
      error: {
        color: "red",
        textAlign: "center",
        fontSize: 12,
        position: 'relative',
        bottom: 34,
      },
});

export default AddServerPage;