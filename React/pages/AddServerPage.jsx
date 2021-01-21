import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Platform, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import Bouton from '../components/bouton';
import Carousel from 'react-native-snap-carousel';
import GamesAPI from "../services/gamesAPI";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.25);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);





const AddServerPage = () => {
   
    const [games, setGames] = useState([]);
    const fetchGames = async () => {
    try {
        const data = await GamesAPI.findAll();
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

    return (
        <View style={styles.createServerPageContainer}>
            <View style={styles.headerContainer}>
                <FormsHero title="Ajouter un serveur" />
            </View>

            <ScrollView style={{height: '60%'}}>
            <Text style={styles.serverType}>Type de serveur</Text>
            <SafeAreaView style={{height: ITEM_HEIGHT*1.2}}>
                    <View style={{ width: '100%',flex: 1, flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                        <Carousel
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

                <View style={styles.formContainer}>
                    <InputText placeholder="Nom du serveur" icon="pen" color="#66A5F9" />
                    <InputText placeholder="Adresse IP" icon="server" color="#66A5F9" />
                    <InputText placeholder="Port" icon="plug" color="#66A5F9" />
                    <InputText 
                        placeholder="Description" 
                        icon="" 
                        color="#66A5F9"
                        height= {400}
                        textAlignVertical='top'
                        numberOfLines={40}
                        multiline={true}  
                    />
                    <InputText placeholder="Site web" icon="chrome" color="#66A5F9" />
                    <InputText placeholder="Discord" icon="discord" color="#66A5F9" />
                    <InputText placeholder="Image du serveur" icon="upload" color="#66A5F9" />
                    <Bouton title="Ajouter un serveur" />
                </View>
            </ScrollView>
        </View>
    );
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
    }
});

export default AddServerPage;