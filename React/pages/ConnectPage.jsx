import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import { Dimensions } from 'react-native';
import Bouton from '../components/bouton';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConnectPage = () => {
    if( Platform.OS === "ios" ) {
        return (
            <KeyboardAvoidingView style={{ width: '100%' }} keyboardVerticalOffset={0} behavior={"position"}>
                <View style={styles.connectPageContainer}>
                    <View style={styles.headerContainer}>
                        <FormsHero title="Connexion" />
                    </View>
                    <View style={styles.formContainer}>
                        <InputText placeholder="Nom d'utilisateur" icon="user" color="#00bcff" />
                        <InputText placeholder="Mot de passe" type="password" icon="lock" color="#00bcff" />
                        <Bouton title="Se connecter" />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
    else {
        return (
            <View style={styles.connectPageContainer}>
                <View style={styles.headerContainer}>
                    <FormsHero title="Connexion" />
                </View>
                <View style={styles.formContainer}>
                    <InputText placeholder="Nom d'utilisateur" icon="user" color="#66A5F9" />
                    <InputText placeholder="Mot de passe" type="password" icon="lock" color="#66A5F9" />
                    <Bouton title="Se connecter" />
                </View>
            </View>
        );
    }
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

export default ConnectPage;