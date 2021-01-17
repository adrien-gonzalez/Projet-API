import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import { Dimensions } from 'react-native';
import Bouton from '../components/bouton';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConnectPage = () => {
    return (
        <View style={styles.connectPageContainer}>
            <View style={styles.headerContainer}>
                <FormsHero />
            </View>
            <View style={styles.formContainer}>
                <InputText placeholder="Identifiant" />
                <InputText placeholder="Mot de passe" />
                <Bouton title="Se connecter" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: '40%',
        // backgroundColor: 'red',
    },
    connectPageContainer: {
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#F1F1F1',
    },
    formContainer: {
        paddingTop: '15%',
        width: windowWidth,
        height: '60%',
        alignItems: 'center',
        // marginTop: 20*windowWidth/100,
        backgroundColor: 'blue',
    },
});

export default ConnectPage;