import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServersListPage = () => {
    return (
        <View style={styles.globalPage}>
        </View>
    );
}

const styles = StyleSheet.create({
    globalPage: {
        height: '100%',
        backgroundColor: 'magenta',
    },
});

export default ServersListPage;