import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Switch } from 'react-native';
import { Dimensions } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
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
import { CommonActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ApparencePage = ({route, navigation}) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const combinedFunctionEnable = (value) => {
        var newValue = "";
        value === true ? newValue = "false" : newValue = "true"
        save("theme", newValue);
        resetNav();
    }

    const getTheme = async () => {
        const theme = await SecureStore.getItemAsync("theme")
        if (theme === "true") setIsEnabled(true);
        if (theme === "false") setIsEnabled(false);
        // console.log('===============================4=====');
        // console.log(theme);
        // console.log('====================================');
    }

    useEffect (() => {
        getTheme()
    })

    const resetNav = async (value) => {
        console.log("lol", value)
        const newValue = await SecureStore.getItemAsync("theme")
        save("theme", newValue);
        console.log("icila2", newValue);
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'HomePage' },
              ],
            })
        );
    }

    // console.log('================isEnabled====================');
    // console.log(isEnabled);
    // console.log('====================================');
    return(
        <ScrollView style={styles.container}>
            <Topbar color="#262626" title="Thème" isText={true} navigation={navigation} backgroundColor="white" />
            <View style={styles.themeContainer}>
                <Text style={styles.themeText}>Thème sombre</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                        combinedFunctionEnable(isEnabled)
                    }}
                    value={isEnabled}
                />
            </View>
        </ScrollView>
    )

}
export default ApparencePage


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F1F1F1'
    },
    themeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 8*windowHeight/100,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        backgroundColor: '#fafafa',
        paddingLeft: 40,
        paddingRight: 40,
    },
    themeText: {
        fontFamily: 'TwCent',
        fontSize: 20,
    }
})