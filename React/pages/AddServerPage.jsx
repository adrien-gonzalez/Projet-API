import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddServerPage = () => {
    return (
        <View style={styles.globalPage}>
        </View>
    );
}

const styles = StyleSheet.create({
    globalPage: {
        height: '100%',
        backgroundColor: 'blue',
    },
});

export default AddServerPage;