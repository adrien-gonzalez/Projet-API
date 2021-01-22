import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import FormsHero from '../components/FormsHero';
import InputText from '../components/TextInput';
import { Dimensions } from 'react-native';
import Bouton from '../components/bouton';
import { Formik } from 'formik';
import axios from 'axios';
import AuthAPI from '../services/authAPI';
import { useNavigation } from '@react-navigation/native';
import * as Updates from 'expo-updates';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConnectPage = () => {
    
    const navigation = useNavigation();
    const handleOnSubmit = async (values, actions) => {
        const donnees = new URLSearchParams();
        donnees.append('login', values.login);
        donnees.append('password', values.password);

        console.log(values);

        try {
            await AuthAPI.authenticate(donnees);
            navigation.navigate("HomePage");
            Updates.reloadAsync();
          } catch (error) {
            console.log(error);
          }
    }

    if( Platform.OS === "ios" ) {
        return (
            <KeyboardAvoidingView style={{ width: '100%' }} keyboardVerticalOffset={0} behavior={"position"}>
                <View style={styles.connectPageContainer}>
                    <View style={styles.headerContainer}>
                        <FormsHero title="Connexion" />
                    </View>
                    <Formik initialValues={{ login: "", password: "" }} onSubmit={handleOnSubmit}>
                        {(formikprops) => (
                        <View style={styles.formContainer}>        
                            <InputText placeholder="Nom d'utilisateur" icon="user" color="#00bcff" value={formikprops.values.login} onChangeText={formikprops.handleChange("login")} />
                            <InputText placeholder="Mot de passe" type="password" icon="lock" color="#00bcff" value={formikprops.values.password} onChangeText={formikprops.handleChange("password")} />
                            <Bouton type="submit" onPress={formikprops.handleSubmit} title="Se connecter" />
                        </View>
                        )}
                    </Formik>
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
                <Formik initialValues={{ login: "", password: "" }} onSubmit={handleOnSubmit}>
                    {(formikprops) => (
                    <View style={styles.formContainer}>        
                        <InputText placeholder="Nom d'utilisateur" icon="user" color="#00bcff" value={formikprops.values.login} onChangeText={formikprops.handleChange("login")} />
                        <InputText placeholder="Mot de passe" type="password" icon="lock" color="#00bcff" value={formikprops.values.password} onChangeText={formikprops.handleChange("password")} />
                        <Bouton type="submit" onPress={formikprops.handleSubmit} title="Se connecter" />
                    </View>
                    )}
                </Formik>
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