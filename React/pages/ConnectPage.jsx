import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FormsHero from '../components/FormsHero';
import Input from '../components/input';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConnectPage = () => {
    return (
        <View style={styles.connectPageContainer}>
            <View style={styles.headerContainer}>
                <FormsHero />
            </View>
            <ScrollView style={styles.formContainer}>
                <View style={styles.centerInput}>
                    <Input />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: '30%',
        // backgroundColor: 'blue',
    },
    connectPageContainer: {
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#F1F1F1',
    },
    formContainer: {
        width: windowWidth,
        height: 100*windowHeight/100,
        // alignItems: 'center',
    },
    centerInput: {
        alignItems: 'center',
    }
});

export default ConnectPage;