import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import Bouton from '../components/bouton';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RegisterPage = () => {
    if( Platform.OS === "ios" ) {
        return (
            <KeyboardAvoidingView style={{ width: '100%' }} keyboardVerticalOffset={0} behavior={"position"}>
                <View style={styles.connectPageContainer}>
                    <View style={styles.headerContainer}>
                        <FormsHero title="Inscription" />
                    </View>
                    <ScrollView style={{height: '60%',}}>
                        <View style={styles.formContainer}>
                            
                                <InputText placeholder="Nom d'utilisateur" icon="user-alt" color="#66A5F9" />
                                <InputText placeholder="Adresse email" type="password" icon="envelope" color="#66A5F9" />
                                <InputText placeholder="Mot de passe" type="password" icon="lock" color="#66A5F9" />
                                <InputText placeholder="Confirmation du mot de passe" type="password" icon="lock" color="#66A5F9" />
                            <Bouton title="Je m'inscris" />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
    else {
        return (
            <View style={styles.connectPageContainer}>
                <View style={styles.headerContainer}>
                    <FormsHero title="Inscription" />
                </View>
                <ScrollView style={{height: '60%',}}>
                    <View style={styles.formContainer}>
                        
                            <InputText placeholder="Nom d'utilisateur" icon="user" color="#00bcff" />
                            <InputText placeholder="Adresse email" type="password" icon="envelope" color="#00bcff" />
                            <InputText placeholder="Mot de passe" type="password" icon="lock" color="#00bcff" />
                            <InputText placeholder="Confirmation du mot de passe" type="password" icon="lock" color="#00bcff" />
                        <Bouton title="Je m'inscris" />
                    </View>
                </ScrollView>
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
        paddingTop: '2%',
        width: windowWidth,
        height: '100%',
        alignItems: 'center',
        paddingBottom: '14%',
    },
});

export default RegisterPage;