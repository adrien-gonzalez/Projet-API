import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import { Dimensions } from 'react-native';
import Bouton from '../components/bouton';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RegisterPage = () => {
    return (
        <View style={styles.connectPageContainer}>
            <View style={styles.headerContainer}>
                <FormsHero title="Inscription" />
            </View>
            <View style={styles.formContainer}>
                <InputText placeholder="Nom d'utilisateur" icon="user-alt" color="#66A5F9" />
                <InputText placeholder="Mot de passe" type="password" icon="lock" color="#66A5F9" />
                <Bouton title="Je m'inscris" />
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
        paddingTop: '8%',
        width: windowWidth,
        height: '60%',
        alignItems: 'center',
    },
});

export default RegisterPage;